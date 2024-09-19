import CustomModalAlert from '@/components/customModalAlert/CustomModalAlert';
import { Dictionary } from '@/types/dictionary';
import { SocialDataForm } from '@/types/profile';
import FormDataUser from '@/components/views/home/components/form/FormDataUser';
import FooterProfile from '@/components/views/home/components/profile/FooterProfile';
import FormAddDataUser from '@/components/views/home/components/profile/FormAddDataUser';
import ModalProfile from '@/components/views/home/components/profile/ModalProfile';
import ModalSuccessDelete from '@/components/views/home/components/profile/ModalSuccessDelete';
import PhotoUser from '@/components/views/home/components/profile/PhotoUser';
import { Container } from '@mui/material';
import ModalAlert from './ModalAlert';
import ProfileHook from './hooks/ProfileHook';
import CustomModalAlertSave from '@/components/customModalAlert/CustomModalAlertSave';

const Profile = ({ dictionary, setIsChangeData, isAlertSaveModal, setIsAlertSaveModal, handleModalSaveAlert, handleNavigate, handleCloseXModal }: { dictionary: Dictionary; setIsChangeData: (e: boolean) => void; isAlertSaveModal: boolean; setIsAlertSaveModal: any; handleModalSaveAlert: () => void; handleNavigate: () => void; handleCloseXModal: () => void; }) => {
  const {
    handleModal,
    handleModalAlert,
    handleSeeMore,
    handleDeleteData,
    isDetailOpen,
    itemDetail,
    isModalOpen,
    isModalAlert,
    handleModalAux,
    dataForm,
    setDataForm,
    isSuccessDelete,
    handleSuccessDelete,
    handleSendProfile,
    noDeleted,
    data,
    handleData,
    user,
    handleSwitch,
    handleAddData,
    handleModalAlertLimit,
    isModalAlertLimit,
    handleDataNetworks,
    setModalIcons,
    itemUrlKey,
    itemUrlSelected,
    handleModalIcons,
    isModalIcons,
    handleSwitchAll,
    isDataError,
    setIsDataError,
    isDataSuccess,
    setIsDataSuccess,
    isEmailPhoneRight,
    setisEmailPhoneRight,
    status,
    isAlertSave,
    isAlertEmptyData,
    setIsEmptyData,
    isAlertEmptyDataAll,
    setIsEmptyDataAll,
  } = ProfileHook({
    dictionary,
    isProUser: false,
    setIsChangeData,
    setIsAlertSaveModal,
    handleNavigate
  });

  const handleDataSet = (data: SocialDataForm) => {
    setDataForm(data);
  };

  return (
    data.length &&
    user && (
      <div>
        <div className="tw-bg-[url('/images/homeBackground.png')] tw-bg-cover tw-bg-center">
          <PhotoUser
            dictionary={dictionary}
            isProUser={false}
            handleSendProfile={handleSendProfile}
            handleSwitchAll={handleSwitchAll}
            name={user.profile && user.profile.social ? user.profile.social?.name?.text || '' : ''}
            isAlertSave={isAlertSave}
          />

          <div className='tw-flex tw-items-start tw-justify-center lg:tw-h-[930px] md:tw-w-[100%]'>
            <Container className='tw-bg-white tw-shadow-md tw-rounded-2xl tw-h-[98%] tw-w-[85%] md:tw-flex tw-items-start tw-justify-center'>
              <FormDataUser
                dictionary={dictionary}
                isProUser={false}
                dataForm={dataForm}
                handleDataSet={(e) => handleDataSet(e)}
                data={data}
                handleData={handleData}
                user={user}
                handleSwitch={handleSwitch}
              />
              <FormAddDataUser
                dictionary={dictionary}
                isProUser={false}
                dataForm={dataForm}
                handleDataSet={(e) => handleDataSet(e)}
                isDetailOpen={isDetailOpen}
                itemDetail={itemDetail}
                handleSeeMore={handleSeeMore}
                handleModalAlert={({ index, subindex }) =>
                  handleModalAlert({ index, subindex })
                }
                data={data}
                handleData={handleData}
                user={user}
                handleSwitch={handleSwitch}
                handleAddData={handleAddData}
                handleModalAlertLimit={handleModalAlertLimit}
                isModalAlertLimit={isModalAlertLimit}
                handleDataNetworks={handleDataNetworks}
                setModalIcons={setModalIcons}
                itemUrlKey={itemUrlKey}
                itemUrlSelected={itemUrlSelected}
                handleModalIcons={handleModalIcons}
                isModalIcons={isModalIcons}
                handleDeleteData={handleDeleteData}
              />
            </Container>
          </div>
          <FooterProfile
            dictionary={dictionary}
            isProUser={false}
            handleSendProfile={handleSendProfile}
            handleSwitchAll={handleSwitchAll}
          />
        </div>

        <ModalProfile
          isModalOpen={isModalOpen}
          handleModal={handleModal}
          dictionary={dictionary}
        />
        <ModalAlert
          isModalAlert={isModalAlert}
          handleModalAlert={handleModalAux}
          dictionary={dictionary}
          handleDeleteData={handleDeleteData}
          noDeleted={noDeleted}
        />
        <ModalSuccessDelete
          isSuccessDelete={isSuccessDelete}
          handleSuccessDelete={handleSuccessDelete}
          dictionary={dictionary}
        />
        <CustomModalAlert
          isModalAlert={isDataError}
          handleModalAlert={setIsDataError}
          title={dictionary?.generalTitle}
          description={dictionary.profileView.errorDataSend}
          isClosed
        />
        <CustomModalAlert
          isModalAlert={isDataSuccess}
          handleModalAlert={setIsDataSuccess}
          title={dictionary?.generalTitle}
          description={dictionary.profileView.successDataSend}
          isClosed
        />
        <CustomModalAlert
          isModalAlert={isAlertEmptyData}
          handleModalAlert={setIsEmptyData}
          title={dictionary?.generalTitle}
          description={dictionary.profileView.emptyData}
          isClosed
        />
        <CustomModalAlert
          isModalAlert={isAlertEmptyDataAll}
          handleModalAlert={setIsEmptyDataAll}
          title={dictionary?.generalTitle}
          description={dictionary.profileView.emptyDataAll}
          isClosed
        />
        <CustomModalAlert
          isModalAlert={isEmailPhoneRight}
          handleModalAlert={setisEmailPhoneRight}
          title={dictionary?.generalTitle}
          description={status}
          isClosed
        />

        {/*  Alerta guardar navegacion */}
        <CustomModalAlertSave
          isModalAlert={isAlertSaveModal}
          handleModalAlert={handleModalSaveAlert}
          title={dictionary?.generalTitle}
          description={dictionary?.homeView?.labelRememberSave}
          isClosed={true}
          isProUser={false}
          handleAccept={handleSendProfile}
          handleCancel={handleNavigate}
          handleCloseXModal={handleCloseXModal}
        />

      </div>
    )
  );
};

export default Profile;
