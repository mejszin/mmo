class Stats {
  constructor() {
    this.gold = 0;
    this.pos = 0;
    this.item_count = 0;
  }

  display() {
    this.showInventory();
  }

  shiftSelected(shift) {
    if (shift < 0) {
      this.pos -= 1;
    } else {
      this.pos += 1;
    }
    if (this.pos >= this.item_count) {
      this.pos = 0;
    }
    if (this.pos < 0) {
      this.pos = this.item_count - 1;
    }
  }

  showInventory() {
    var div = document.getElementById("inventory");
    div.innerHTML = "";
    this.item_count = Object.keys(player.inventory).length;
    if (this.item_count !== 0) {
      div.style.display = "flex";
      var index = 0;
      var table = createElement("table").parent(div);
      // Show gold
      var image_path = image_paths["GOLD"];
      var name = item_names["GOLD"];
      var quantity = beautifyNumber(player.inventory["GOLD"]);
      this.addInventoryRow(table, image_path, name, quantity, index);
      // Create items
      for (let item in player.inventory) {
        if (item != "GOLD") {
          index += 1;
          var image_path = (item in image_paths) ? image_paths[item] : image_paths["NULL"];
          var name = (item in item_names) ? item_names[item] : item;
          var quantity = beautifyNumber(player.inventory[item]);
          this.addInventoryRow(table, image_path, name, quantity, index);
        }
      }
    } else {
      div.style.display = "none";
    }
  }

  addInventoryRow(table, image_path, name, quantity, index) {
    var row = createElement("tr").parent(table);
    createElement("td", `<img src = \"${image_path}\">`).class("icon").parent(row);
    var cell = createElement("td").class("name").parent(row);
    var span = createElement("span", name).parent(cell);
    if (index == this.pos) { span.class("selected") }
    createElement("td", ":").class("quantity").parent(row);
    createElement("td", quantity).class("quantity").parent(row);
  }
}

function beautifyNumber(number) {
  if (number > 1000000000) {
    return floor(number / 1000000000).toString() + "b";
  }
  if (number > 1000000) {
    return floor(number / 1000000).toString() + "m";
  }
  if (number > 1000) {
    return floor(number / 1000).toString() + "k";
  }
  return number.toString();
}

//   <table id = "inventory">
//   <tr>
//     <th colspan = "3">Inventory</th>
//   </tr>
//   <tr>
//     <td class = "icon"><img src = "./img/gold.png"></td>
//     <td class = "name">Gold</td>
//     <td class = "quantity">:</td>
//     <td class = "quantity">0</td>
//   </tr>
//   <tr>
//     <td class = "icon"><img src = "./img/potion.png"></td>
//     <td class = "name">Potion</td>
//     <td class = "quantity">:</td>
//     <td class = "quantity">0</td>
//   </tr>
//   </table>