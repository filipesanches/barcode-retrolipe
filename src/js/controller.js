import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { viewBarcode } from './view';
import { modelBarcode } from './model';
import Quagga from 'quagga';

const controllerBarcode = () => {
  const view = viewBarcode();
  const model = modelBarcode();

  const clickGenerate = async () => {
    try {
      await view.hideElementLabel();
      await view.createSpinner();
      const barcodeValue = document.querySelector('#barcode').value;
      const typesBarcode = await model.getTypeBarcodes();
      // await view.renderBarcode(typesBarcode, barcodeValue);
      // view.hideSpinner();
      setTimeout(() => {
        view.renderBarcode(typesBarcode, barcodeValue);
        view.hideSpinner();
      }, 300); // teste spiner
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const clickScan = async () => {
    try {
      await view.renderScan();
      await model.scanBarcode();
    } catch (error) {
      console.error('Error occurred:', error.message);
    }
  };

  const initController = async () => {
    try {
      // await model.scanBarcode();
      await view.hideElementLabel();
      await view.resetInputs();
      const buttonGenerate = document.querySelector('#generate-barcode');
      buttonGenerate.addEventListener('click', clickGenerate);
      const buttonCapture = document.querySelector('#capture-barcode');
      buttonCapture.addEventListener('click', clickScan);
    } catch (error) {
      console.error('Error occurred during initialization:', error);
    }
  };

  return {
    initController,
  };
};

const controller = controllerBarcode();
controller.initController();
