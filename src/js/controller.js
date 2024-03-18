import "core-js/stable";
import "regenerator-runtime/runtime";
import { viewBarcode } from "./view";
import { modelBarcode } from "./model";
import Quagga from "quagga";

const controllerBarcode = () => {
  const view = viewBarcode();
  const model = modelBarcode();

  const clickGenerate = async () => {
    try {
      await view.hideElementLabel();
      await view.createSpinner();
      const barcodeValue = document.querySelector("#barcode").value;
      const typesBarcode = await model.getTypeBarcodes();
      // await view.renderBarcode(typesBarcode, barcodeValue);
      // view.hideSpinner();
      setTimeout(() => {
        view.renderBarcode(typesBarcode, barcodeValue);
        view.hideSpinner();
      }, 300); // teste spiner
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const initController = async () => {
    try {
      await view.hideElementLabel();
      await view.resetInputs();
      const buttonGenerate = document.querySelector("#generate-barcode");
      buttonGenerate.addEventListener("click", clickGenerate);
    } catch (error) {
      console.error("Error occurred during initialization:", error);
    }
  };

  return {
    initController,
  };
};

const controller = controllerBarcode();
controller.initController();


Quagga.init({
  inputStream : {
    name : "Live",
    type : "LiveStream",
    target: document.querySelector('#barcode-scan')    // Or '#yourElement' (optional)
  },
  decoder : {
    readers : ["code_128_reader"]
  }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(data => console.log(data.codeResult.code));