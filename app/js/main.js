
const listItems = document.querySelector('.list-items');
const slider1 = document.getElementById('range-slider1');
const slider2 = document.getElementById('range-slider2');
const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');
const minSpace = document.querySelector('.min-space');
const maxSpace = document.querySelector('.max-space');
const filterReset = document.querySelector('.filter-rset')

const roomsBtnFilter = document.querySelectorAll('.room')

filterReset.addEventListener('click', () => {
  getListCard(false)
  removeActive(roomsBtnFilter)
  slider1.noUiSlider.reset()
  slider2.noUiSlider.reset()
})

const removeActive = (item) => {
  item.forEach(el => el.classList.remove('active'))
}

roomsBtnFilter.forEach(item => {
  item.addEventListener('click', () => {
    slider1.noUiSlider.reset()
    slider2.noUiSlider.reset()
    removeActive(roomsBtnFilter)
    item.classList.add('active')
    let num = item.textContent.charAt(0)
    getListCard(num)
  })
})

const getData = async (url) => {
  const data = await fetch(url)

  if (!data.ok) {
    throw new Error(`Данные не получены ${data.status} ${data.statusText}`)
  }
  return data.json()
}

const getListCard = (num) => {
  getData('http://127.0.0.1:5501/db.json')

    .then(data => {

      slider1.noUiSlider.on('change', (values) => {
        slider2.noUiSlider.reset()
        removeActive(roomsBtnFilter)
        let resultFilterCost = data.filter(item => item.cost > values[0] && item.cost < values[1])
        renderCart(resultFilterCost)
      })

      slider2.noUiSlider.on('change', (values) => {
        slider1.noUiSlider.reset()
        removeActive(roomsBtnFilter)
        let resultFilterSpace = data.filter(item => item.space > Math.round(values[0]) && item.space < Math.round(values[1]))
        renderCart(resultFilterSpace)
      })

      renderCart(data, num)

      const disabled = (countRoom) => {
        if (data.filter(item => item.rooms == countRoom).length == 0) {
          roomsBtnFilter.forEach(item => {
            item.textContent.charAt(0) == countRoom ? item.classList.add('disabled') : null
          })
        }
      }

      disabled(1)
      disabled(2)
      disabled(3)
      disabled(4)
    })
    .catch(err => {
      console.error(err);
    })

}



getListCard(false)
//  ==========================

const renderCart = (data, rooms) => {
  listItems.textContent = '';

  if (rooms) {
    data = data.filter(item => {
      return item.rooms == rooms
    })
  }

  data.forEach(({ rooms, number, space, floors, cost }) => {

    const div = document.createElement('div');
    div.classList.add("apartment-item");

    div.innerHTML = ` 

              <div class="scheme">
                <img src="img/scheme.png" alt="scheme">
              </div>

              <div class="type">
                <span>${rooms}-комнатная ${number}</span>
              </div>

              <div class="space">
                <span>${space}</span>
              </div>

              <div class="floors">
                ${floors}<span> из 17 этаж</span>
              </div>

              <div class="price">
                <span>${cost}</span>
              </div>
  
    `;
    listItems.append(div)
  })

}



// ====================================

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
    start: [900000, 35000000],
    connect: true,
    range: {
      'min': 900000,
      'max': 35000000
    }
  });

  hsowSlidersValues(slider1, minPrice, maxPrice);
}

if (slider2) {
  noUiSlider.create(slider2, {
    start: [10, 220],
    connect: true,
    range: {
      'min': 10,
      'max': 220
    }
  });

  hsowSlidersValues(slider2, minSpace, maxSpace);
}



//  scroll  =====================

const goUp = document.querySelector('.up')

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 500) {
    goUp.classList.add('show');
  } else {
    goUp.classList.remove('show');
  }
});

let t;

const up = () => {
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

  if (top > 0) {
    window.scrollBy(0, ((top + 100) / -10));
    t = setTimeout('up()', 20);
  } else clearTimeout(t);
  return false;
}

goUp.addEventListener('click', up)

// ===================================  sort


// const cards = document.querySelector('.list-items').children

// const cardsArr = Array.from(cards)

// console.log(cardsArr);

// cards.map(item => console.log(item))


const filter = (data, room, costMin, costMax, spaceMin, spaceMax) => {

}