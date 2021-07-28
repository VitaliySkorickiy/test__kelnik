
console.log(1);

const slider1 = document.getElementById('range-slider1');
const slider2 = document.getElementById('range-slider2');
const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');
const minSpace = document.querySelector('.min-space');
const maxSpace = document.querySelector('.max-space');

const hsowSlidersValues = (slider, minDiv, maxDiv) => {

  slider.noUiSlider.on('update', (values) => {
    let minValues = Math.round(values[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    minDiv.querySelector('span').textContent = minValues;

    let maxValues = Math.round(values[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    maxDiv.querySelector('span').textContent = maxValues;
  })
}

if (slider1) {
  noUiSlider.create(slider1, {
    start: [5500000, 18900000],
    connect: true,
    range: {
      'min': 0,
      'max': 35000000
    }
  });

  hsowSlidersValues(slider1, minPrice, maxPrice);
}

if (slider2) {
  noUiSlider.create(slider2, {
    start: [33, 123],
    connect: true,
    range: {
      'min': 10,
      'max': 220
    }
  });

  hsowSlidersValues(slider2, minSpace, maxSpace);
}

