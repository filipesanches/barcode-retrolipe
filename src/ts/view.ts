
  createSpinner: () => HTMLDivElement;
  hideSpinner: () => void;
  resetInputs: () => void;
  hideElementLabel: () => void;
  generateBarcode: (barcodeValue: string | number, text: string) => Promise<boolean>;
  renderButtonDownload: (url: string, element: HTMLElement, downloadName: string) => void;
  createImgBarcode: (typesBarcode: string | number) => HTMLImageElement;
  appendContainerImage: (containerImages: HTMLElement, imgBarcode: HTMLImageElement) => void;
  renderBarcode: (typesBarcode: string | number) => void;
  renderSCan: () => Promise<HTMLDivElement>;
}

