var list = [];

function getStyle(element, attr) {
  if (element.currentStyle) {
    return element.currentStyle[attr];
  } else {
    return getComputedStyle(element, false)[attr];
  }
}

function pinFunction() {
  if (pin) {
    var you_text = document.getElementById("you_text");
    var tmp = you_text.innerHTML;
    you_text.innerHTML = name_sections[this.index].innerHTML;
    name_sections[this.index].innerHTML = tmp;

    var you_text = document.getElementById("my_icon");
    var tmp = you_text.innerHTML;
    you_text.innerHTML = people_icon_names[this.index].innerHTML;
    people_icon_names[this.index].innerHTML = tmp;

    var tmp = getStyle(my_icon, "background");
    my_icon.style.background =
      people_icon_sections[this.index].style.background;
    people_icon_sections[this.index].style.background = tmp;

    UpdateBlock();
  } else {
    pin = true;
    var my_block = document.getElementById("my_block");
    my_block.style.display = "block";

    var others_block = document.getElementById("others_block");
    others_block.style.width = "30%";
    others_block.style.justifyContent = "space-evenly";
    others_block.style.top = "12%";
    others_block.style.left = "";
    others_block.style.right = "0";

    for (var i = 0; i < blocks.length; ++i) {
      blocks[i].style.width = "48%";
      blocks[i].style.height = "30%";
      blocks[i].style.borderRight = "";
      blocks[i].style.borderTop = "5px solid #202124";
    }

    var you_text = document.getElementById("you_text");
    you_text.innerHTML = name_sections[this.index].innerHTML;

    var you_text = document.getElementById("my_icon");
    you_text.innerHTML = people_icon_names[this.index].innerHTML;

    var you_color = document.getElementById("my_icon");
    you_color.style.background =
      people_icon_sections[this.index].style.background;

    blocks[this.index].parentNode.removeChild(blocks[this.index]);

    UpdateBlock();
    for (var i = 0; i < blocks.length; i++) {
      people_icon_names[i].style.fontSize = "2vw";
    }
  }
}

function removeOne() {
  var need_remove = blocks[this.index];
  need_remove.parentNode.removeChild(need_remove);
  UpdateBlock();
}

function Init() {
  people_icon_sections[0].style.background = "#154D38";
  people_icon_sections[1].style.background = "#F59112";
  people_icon_sections[2].style.background = "#5C39A7";
  people_icon_sections[3].style.background = "#502C2C";
  people_icon_sections[4].style.background = "rgb(62, 108, 235)";

  my_close_top_left.onclick = function () {
    var you_text = document.getElementById("you_text");
    var tmp = you_text.innerHTML;
    you_text.innerHTML = name_sections[0].innerHTML;

    var you_text = document.getElementById("my_icon");
    var tmp = you_text.innerHTML;
    you_text.innerHTML = people_icon_names[0].innerHTML;

    var tmp = getStyle(my_icon, "background");
    my_icon.style.background = people_icon_sections[0].style.background;
    // remove the first in blocks
    blocks[0].parentNode.removeChild(blocks[0]);

    UpdateBlock();
  };

  UpdateBlock();
  for (var i = 0; i < blocks.length; ++i) {
    buttons[i].onclick = removeOne;

    hover_blocks[i].onclick = pinFunction;

    my_hover_item.onclick = function () {
      if (pin) {
        pin = false;
        var my_block = document.getElementById("my_block");
        my_block.style.display = "none";

        var others_block = document.getElementById("others_block");
        others_block.style.width = "100%";
        others_block.style.justifyContent = "flex-start";
        others_block.style.top = "5%";
        others_block.style.left = "5%";

        for (var i = 0; i < blocks.length; ++i) {
          blocks[i].style.width = "30%";
          blocks[i].style.height = "50%";
          blocks[i].style.borderRight = "10px solid #202124";
          blocks[i].style.borderTop = "10px solid #202124";
        }

        var block_par = document.getElementById("others_block");
        block_par.appendChild(blocks[0].cloneNode(true));
        UpdateBlock();

        var you_text = document.getElementById("you_text");
        name_sections[blocks.length - 1].innerHTML = you_text.innerHTML;

        var you_text = document.getElementById("my_icon");
        people_icon_names[blocks.length - 1].innerHTML = you_text.innerHTML;

        var tmp = getStyle(my_icon, "background");
        people_icon_sections[blocks.length - 1].style.background = getStyle(
          my_icon,
          "background"
        );

        UpdateBlock();
        buttons[blocks.length - 1].onclick = removeOne;
        hover_blocks[blocks.length - 1].onclick = pinFunction;
        for (var i = 0; i < blocks.length; i++) {
          people_icon_names[i].style.fontSize = "3vw";
        }
      }
    };
  }
}

function UpdateBlock() {
  if (!pin && blocks.length == 1) {
    var my_block = document.getElementById("my_block");
    my_block.style.display = "block";

    var others_block = document.getElementById("others_block");
    others_block.style.width = "30%";
    others_block.style.justifyContent = "space-evenly";
    others_block.style.top = "12%";
    others_block.style.left = "";
    others_block.style.right = "0";

    for (var i = 0; i < blocks.length; ++i) {
      if (name_sections[i].innerHTML == "你") {
        var you_text = document.getElementById("you_text");
        you_text.innerHTML = name_sections[i].innerHTML;

        var you_text = document.getElementById("my_icon");
        you_text.innerHTML = people_icon_names[i].innerHTML;
        var you_color = document.getElementById("my_icon");
        you_color.style.background = people_icon_sections[i].style.background;

        blocks[i].parentNode.removeChild(blocks[i]);
      }
    }
    pin = true;
  }

  if (blocks.length == 0) {
    var my_block = document.getElementById("my_block");
    my_block.style.width = "100%";
    var others_block = document.getElementById("others_block");
    others_block.style.display = "none";
    var my_mic_top_right = document.getElementById("my_mic_top_right_pos");
    my_mic_top_right.style.zIndex = "1";

    my_hover_item.onclick = function () {};
  }

  for (var i = 0; i < blocks.length; ++i) {
    blocks[i].index = i;
    buttons[i].index = i;
    hover_blocks[i].index = i;
    name_sections[i].index = i;
    people_icon_names[i].index = i;
    people_icon_sections[i].index = i;

    if (name_sections[i].innerHTML == "你") {
      buttons[i].style.visibility = "hidden";
    } else {
      buttons[i].style.visibility = "visible";
    }
  }

  var people_num = document.getElementById("people_num_text");
  people_num_text.innerHTML = blocks.length + 1;
  var you_text = document.getElementById("you_text");

  if (you_text.innerHTML == "你") {
    my_close_top_left.style.display = "none";
  } else {
    my_close_top_left.style.display = "block";
  }
}

var pin = true;

blocks = document.getElementsByClassName("one_block");
buttons = document.getElementsByClassName("close_top_left");
hover_blocks = document.getElementsByClassName("people_hover_items2");
name_sections = document.getElementsByClassName("name_section");
people_icon_names = document.getElementsByClassName("people_icon_name");
people_icon_sections = document.getElementsByClassName("people_icon_section");
my_hover_item = document.getElementById("my_hover_item");
my_close_top_left = document.getElementById("my_close_top_left");
Init();
