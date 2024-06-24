import PageHeader from '../page-header';

export interface BannerMenuParams {
  seoTitle: string;
  title: string;
  item: string;
  activeItem: string;
}

const BannerMenu = (params: BannerMenuParams) => {
  return (
    <>
      <PageHeader
        title={params.title}
        item={params.item}
        active_item={params.activeItem}
      />
    </>
  );
};

export default BannerMenu;
