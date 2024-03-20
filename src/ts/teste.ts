import 'core-js/stable';
import 'regenerator-runtime/runtime';
import JsBarcode from 'jsbarcode';

interface ViewBarcode {
  resetInputs: () => void;
  hideElementLabel: () => void;
  renderBarcode: (typesBarcode: string[]) => Promise<void>;
  createSpinner: () => Promise<HTMLDivElement>;
  hideSpinner: () => void;
  renderScan: () => Promise<HTMLDivElement>;
  generateBarcode: (barcodeValue: string, text: string) => Promise<boolean>;
  renderButtonDownload: (url: string, element: HTMLElement, downloadName: string) => void;
  createImgBarcode: (typesBarcode: string) => HTMLImageElement;
  appendContainerImage: (containerImages: HTMLElement, imgBarcode: HTMLImageElement) => HTMLDivElement;
}

const viewBarcode = (): ViewBarcode => {
  const createSpinner = async (): Promise<HTMLDivElement> => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    const imagesContainer = document.querySelector('.images-container');
    if (imagesContainer instanceof HTMLElement) {
      imagesContainer.appendChild(spinner);
    }
    return spinner;
  };

  const hideSpinner = (): void => {
    const spinner = document.querySelector('.spinner');
    if (spinner instanceof HTMLElement && spinner.parentNode) {
      spinner.parentNode.removeChild(spinner);
    }
  };

  const resetInputs = (): void => {
    const checkboxes = document.querySelectorAll('.barcode-options-container [type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = false;
      }
    });
    const barcodeInput = document.querySelector('#barcode') as HTMLInputElement;
    if (barcodeInput) {
      barcodeInput.value = '';
    }
  };

  const hideElementLabel = (): void => {
    const elementsToRemove = document.querySelectorAll('.images-container > div, .images-container a');
    elementsToRemove.forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  };

  const generateBarcode = async (barcodeValue: string, text: string): Promise<boolean> => {
    try {
      await JsBarcode(`[data-label="${barcodeValue}"]`, text, {
        format: barcodeValue,
        text: text,
        width: 2,
        height: 40,
      });
      return true;
    } catch (error) {
      console.error('Error generating barcode:', error);
      return false;
    }
  };

  const renderButtonDownload = (url: string, element: HTMLElement, downloadName: string): void => {
    const button = document.createElement('a');
    button.href = url;
    button.download = 'retrolipe_barcode_' + downloadName;
    if (element.parentNode) {
      element.parentNode.insertBefore(button, element.nextSibling);
    }
  };

  const createImgBarcode = (typesBarcode: string): HTMLImageElement => {
    const img = document.createElement('img');
    img.alt = 'Formato do código não suportado';
    img.setAttribute('data-label', typesBarcode);
    return img;
  };

  const appendContainerImage = (containerImages: HTMLElement, imgBarcode: HTMLImageElement): HTMLDivElement => {
    const div = document.createElement('div');
    div.appendChild(imgBarcode);
    containerImages.appendChild(div);
    return div;
  };

  const renderBarcode = async (typesBarcode: string[]): Promise<void> => {
    const containerImages = document.querySelector('.images-container') as HTMLElement;
    const textInput = document.querySelector('#barcode') as HTMLInputElement;
    if (!containerImages || !textInput) return; // Verifica se os elementos foram encontrados
    const text = textInput.value;
    for (const barcodeValue of typesBarcode) {
      const imgBarcode = createImgBarcode(barcodeValue);
      appendContainerImage(containerImages, imgBarcode);
      const barcodeGenerated = await generateBarcode(barcodeValue, text);
      if (barcodeGenerated) renderButtonDownload(imgBarcode.src, imgBarcode, `${text}_${barcodeValue}`);
    }
  };

  const renderScan = async (): Promise<HTMLDivElement> => {
    const div = document.createElement('div');
    div.id = 'barcode-scan';
    document.body.appendChild(div);
    return div;
  };

  return {
    resetInputs,
    hideElementLabel,
    renderBarcode,
    createSpinner,
    hideSpinner,
    renderScan,
    generateBarcode,
    renderButtonDownload,
    createImgBarcode,
    appendContainerImage,
  };
};

export { viewBarcode };
