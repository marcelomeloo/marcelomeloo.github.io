$(document).ready(() => {
  $('#tree li').click(select);

  $('#removeElement').click(remove);

  $('#changeColor').click(function () {
    const selectedElement = $('.selected');
    if (selectedElement.css('background-color') === 'rgb(255, 193, 8)') {
      selectedElement.css('background-color', '#ffffff');
    } else {
      selectedElement.css('background-color', 'rgb(255, 193, 8)');
    }
  });

  $('#addElement').click(addElement);
});

const select = function (event) {
  event.stopPropagation();
  $('#tree li').removeClass('selected');
  $(this).addClass('selected');
}

const remove = () => {
  const selectedElement = $('.selected');
  selectedElement.remove();
}

const addElement = function () {
  const selectedElement = $('.selected');

  const ulExists = selectedElement.children('ul').length > 0;

  if (ulExists) {
    let parentIndex = selectedElement.text().replace(/\n/g, '').split(' ')[1];
    parentIndex = parentIndex.replace('Elemento', '');
    const newElementIndex = selectedElement.children('ul').children('li').length + 1;
    const newElement = $('<li>Elemento ' + parentIndex + '.' + newElementIndex + '</li>');
    selectedElement.children('ul').append(newElement);
  } else {
    const parentIndex = selectedElement.text().replace(/\n/g, '').split(' ')[1];
    const newElementIndex = selectedElement.children().length + 1;
    const newElement = $('<ul>\n<li>Elemento ' + parentIndex + '.' + newElementIndex + '</li>\n</ul>');
    selectedElement.append(newElement);
  }

  $('#tree li').off('click', select);
  $('#tree li').on('click', select);
}