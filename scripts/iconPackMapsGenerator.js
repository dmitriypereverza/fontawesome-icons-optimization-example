const path = require("path");
const fs = require("fs");

const outDir = "src/components/Icon/IconPackMaps";
const packs = [
  {
    name: "FreeSolidSVGIcons",
    lib: "node_modules/@fortawesome/free-solid-svg-icons",
    prefix: "fas",
  },
  {
    name: "FreeRegularSVGIcons",
    lib: "node_modules/@fortawesome/free-regular-svg-icons",
    prefix: "far",
  },
  {
    name: "FreeBrandsSVGIcons",
    lib: "node_modules/@fortawesome/free-brands-svg-icons",
    prefix: "fab",
  },
  {
    name: "Custom",
    lib: "src/components/Icon/CustomIconsPack",
    prefix: "fac",
  },
];

/**
 * @param {{ name: string; lib: string; prefix: string; }} pack
 * @param {string} iconsNameMapString
 * @return {string}
 */
const generateExportDefaultTemplate = (
  pack,
  iconsNameMapString
) => `const packInfo = {
    lib: "${pack.lib}",
    prefix: "${pack.prefix}",
    iconsNameMap: {
      ${iconsNameMapString}
    }
};
type ${pack.name}Type = {
  lib: string;
  prefix: string;
  iconsNameMap: Record<keyof typeof packInfo.iconsNameMap, () => Promise<any>>;
}
export default packInfo as ${pack.name}Type;
`;

/**
 * @param {string} filePath
 * @param {string} outPath
 * @return {string}
 */
function libPathResolver(filePath, outPath) {
  if (filePath.startsWith("node_modules/")) {
    return filePath.substr(13);
  }
  return path.relative(outPath, filePath);
}

/**
 * @param {string} filePath
 * @return {string}
 */
function getFileNameWithoutExt(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

/**
 * @param {string} iconName
 * @param {string} prefix
 * @return {string}
 */
function generateIconName(iconName, prefix) {
  const iconNameWithoutPrefix = iconName.startsWith("fa")
    ? iconName.substr(2, iconName.length)
    : iconName;
  return `${prefix}${iconNameWithoutPrefix}`;
}

packs.forEach((pack) => {
  fs.readdir(pack.lib, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    const iconMapString = files
      .filter((filePath) => !!/^fa[\w]+\.(js|ts)$/.test(filePath))
      .map(getFileNameWithoutExt)
      .map((iconName) => {
        const key = generateIconName(iconName, pack.prefix);
        const relativeLibPath = libPathResolver(pack.lib, outDir);
        const value = `() => import('${relativeLibPath}/${iconName}') as Promise<any>`;
        return `"${key}": ${value}`;
      })
      .join(",\n\t\t\t");

    const template = generateExportDefaultTemplate(pack, iconMapString);
    const outFile = `${outDir}/${pack.name}.ts`;
    fs.writeFile(outFile, template, { flag: "w" }, (err) => {
      if (err) {
        console.error("Не удалось записать файл.\n\n" + err);
        return;
      }
      console.info(`Сгенерирован файл: ${outFile}`);
    });
  });
});
