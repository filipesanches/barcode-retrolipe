import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ViewBarcode } from './view';
import { CreateModelBarcode } from './model';

function ControllerBarcode() {
  const view = ViewBarcode();
  const model = CreateModelBarcode();

  async function clickGenerate() {
    try {
      view.hideElementLabel();
      const typesBarcode = await model.getTypeBarcodes();
      console.log(typesBarcode);
      view.renderBarcode(typesBarcode, document.querySelector('#barcode').value);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  function initController() {
    view.hideElementLabel();
    view.resetInputs();
    const buttonGenerate = document.querySelector('#generate-barcode');
    buttonGenerate.addEventListener('click', clickGenerate);
  }

  return {
    initController,
  };
}

const controller = ControllerBarcode();
controller.initController();

export { ControllerBarcode };
