import { formatFileSize } from 'react-papaparse';
import UploadDocumentHook from './hook/UploadCsvHook';
import {
  DEFAULT_REMOVE_HOVER_COLOR,
  REMOVE_HOVER_COLOR_LIGHT,
  styles,
} from './styles/stylesUploadCsv';
import { Modal } from 'react-bootstrap';
import { ModalParamsCsv } from '@/types/modals';

export default function CSVReader({
  handleShowCsv,
  setHandleShowCsv,
  reference,
  title,
}: ModalParamsCsv) {
  const {
    CSVReader,
    setRemoveHoverColor,
    setZoneHover,
    zoneHover,
    removeHoverColor,
    handleUploadAccepted,
    errorDataUpload,
    show,
    handleClose,
  } = UploadDocumentHook({ handleShowCsv, setHandleShowCsv, reference, title });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title as='h6'>
          {`Crear ${title} masivos desde archivo Csv`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CSVReader
          onUploadAccepted={(results: { data: any }) => {
            handleUploadAccepted(results);
          }}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }: any) => (
            <>
              <div
                {...getRootProps()}
                style={Object.assign(
                  {},
                  styles.zone,
                  zoneHover && styles.zoneHover
                )}
              >
                {acceptedFile ? (
                  <>
                    <div style={styles.file}>
                      <div style={styles.info}>
                        <span style={styles.size}>
                          {formatFileSize(acceptedFile.size)}
                        </span>
                        <span style={styles.name}>{acceptedFile.name}</span>
                      </div>
                      <div style={styles.progressBar}>
                        <ProgressBar />
                      </div>
                      <div
                        {...getRemoveFileProps()}
                        style={styles.remove}
                        onMouseOver={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                        }}
                        onMouseOut={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                        }}
                      >
                        <Remove color={removeHoverColor} />
                      </div>
                    </div>
                  </>
                ) : (
                  'Haz click para subir tu archivo Csv'
                )}
              </div>
              {errorDataUpload?.map((value) => {
                return !value.success && `error: ${value.code}`;
              })}
            </>
          )}
        </CSVReader>
      </Modal.Body>
    </Modal>
  );
}
