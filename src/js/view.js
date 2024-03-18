import JsBarcode from "jsbarcode";

const viewBarcode = () => {

  const createSpinner = async () => {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    document.querySelector(".images-container").appendChild(spinner);
    return spinner;
  };

  const hideSpinner = () => {
    document.querySelector('.spinner').remove();
  };

  const resetInputs = async () => {
    const checkboxes = document.querySelectorAll(
      '.barcode-options-container [type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    document.querySelector("#barcode").value = "";
  };

  const hideElementLabel = async () => {
    document
      .querySelectorAll(".images-container > div, .images-container a")
      .forEach((element) => {
        element.remove();
      });
  };

  const generateBarcode = async (barcodeValue, text) => {
    try {
      await JsBarcode(`[data-label="${barcodeValue}"]`, text, {
        format: barcodeValue,
        text: text,
        width: 2,
        height: 40,
      });
      return true;
    } catch (error) {
      console.error("Error generating barcode:", error);
      return false;
    }
  };

  const renderButtonDownload = (url, element, downloadName) => {
    const button = document.createElement("a");
    button.href = url;
    button.download = "retrolipe_barcode_" + downloadName;
    element.parentNode.insertBefore(button, element.nextSibling);
  };

  const createImgBarcode = (typesBarcode) => {
    const img = document.createElement("img");
    img.alt = "Formato do código não suportado";
    img.setAttribute("data-label", typesBarcode);
    return img;
  };

  const appendContainerImage = (containerImages, imgBarcode) => {
    const div = document.createElement("div");
    div.appendChild(imgBarcode);
    containerImages.appendChild(div);
    return div;
  };

  const renderBarcode = async (typesBarcode) => {
    const containerImages = document.querySelector(".images-container");
    const text = document.querySelector("#barcode").value;
    for (const barcodeValue of typesBarcode) {
      const imgBarcode = createImgBarcode(barcodeValue);
      appendContainerImage(containerImages, imgBarcode);
      const barcodeGenerated = await generateBarcode(barcodeValue, text);
      if (barcodeGenerated) renderButtonDownload(imgBarcode.src, imgBarcode, `${text}_${barcodeValue}`);
    }
  };

  return {
    resetInputs,
    hideElementLabel,
    renderBarcode,
    createSpinner,
    hideSpinner
  };
};

export { viewBarcode };
