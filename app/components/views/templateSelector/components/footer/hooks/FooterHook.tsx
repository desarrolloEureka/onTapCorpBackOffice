export const sortedArrayObject = (data: any[], index: string) => {
  const arraySorted = data.sort((x, y) => {
    const xx = x.length > 0 ? x[0].order : x.order;
    const yy = y.length > 0 ? y[0].order : y.order;
    //array sorted
    if (index == 'social' ? xx > yy : x[0].order > y[0].order) {
      return 1;
    }
    if (index == 'social' ? xx < yy : x[0].order < y[0].order) {
      return -1;
    }
    return 0;
  });

  return { arraySorted };
};

const FooterHook = ({socialNetworks}: { socialNetworks: any}) => {
  let arraySorted: any = [];
  const social = socialNetworks?.filter((val: any) =>  val.checked);
    arraySorted = sortedArrayObject(social ?? [], 'social').arraySorted;
  const finalArray = arraySorted;
  return { finalArray };
};
export default FooterHook;
