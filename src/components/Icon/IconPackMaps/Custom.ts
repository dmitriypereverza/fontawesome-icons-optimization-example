const packInfo = {
    lib: "src/components/Icon/CustomIconsPack",
    prefix: "fac",
    iconsNameMap: {
      "facCurrentBranch": () => import('../CustomIconsPack/faCurrentBranch') as Promise<any>,
			"facJustSelect": () => import('../CustomIconsPack/faJustSelect') as Promise<any>,
			"faclQuestionCustom": () => import('../CustomIconsPack/falQuestionCustom') as Promise<any>,
			"facrCog": () => import('../CustomIconsPack/farCog') as Promise<any>,
			"facsTimes": () => import('../CustomIconsPack/fasTimes') as Promise<any>
    }
};
type CustomType = {
  lib: string;
  prefix: string;
  iconsNameMap: Record<keyof typeof packInfo.iconsNameMap, () => Promise<any>>;
}
export default packInfo as CustomType;
