// toggle select all for donated vhs lists //
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.rowCheckbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
    });
    updateSelected();
}
  
// update selected vhs info //
function updateSelected() {
  let selectedItems = [];
  document.querySelectorAll(".rowCheckbox:checked").forEach(checkbox => {
    let row = checkbox.closest("tr");
    let id = row.dataset.id;
    let donor = row.querySelector("td:nth-child(2)").textContent;
    let title = row.querySelector("td:nth-child(3)").textContent;
    let releaseDate = row.querySelector("td:nth-child(4)").textContent;
    let donatedDate = row.querySelector("td:nth-child(5)").textContent;
    selectedItems.push({ id, donor, title, releaseDate, donatedDate });
  });

  let selectedTable = document.getElementById("selectedItems");
  selectedTable.innerHTML = "";

  if (selectedItems.length === 0) {
    selectedTable.innerHTML = "<tr><td colspan='4'>No items selected.</td></tr>";
  } else {
    selectedItems.forEach(item => {
      let row = `<tr data-id="${item.id}">
                  <td><input type="text" class="form-control" value="${item.donor}" /></td>
                  <td><input type="text" class="form-control" value="${item.title}" /></td>
                  <td><input type="date" class="form-control" value="${item.releaseDate}" /></td>
                  <td><input type="date" class="form-control" value="${item.donatedDate}" /></td>
                </tr>`;
      selectedTable.innerHTML += row;
    });
  }
}

// delete vhs entry //
async function deleteVHS(id) {
  if (!confirm(`Are you sure you want to delete this VHS tape? "${id}"`)) return;

  try {
    const response = await fetch(`/vhs/api/v1/delete/${id.toString()}`, { 
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' } 
    });
    const data = await response.json();
    location.reload();
  } catch (error) {
    alert("Error deleting VHS: " + error.message + id);
  }
}
  
function saveChanges() {
  let updatedVHS = [];
  document.querySelectorAll("#selectedItems tr").forEach(row => {
    let id = row.dataset.id;
    let donor = row.querySelector("td:nth-child(1) input").value;
    let title = row.querySelector("td:nth-child(2) input").value;
    let releaseDate = row.querySelector("td:nth-child(3) input").value;
    let donatedDate = row.querySelector("td:nth-child(4) input").value;

    let updatedRecord = {
      "_id": id,
      "donorName": donor,
      "vhsTitle": title,
      "releaseDate": releaseDate,
      "donateDate": donatedDate,
      __v: 0
    };

    console.log(updatedRecord);    
    updateByID(id, updatedRecord);
  });

}

// update vhs entry(ies) //
async function updateByID(vhsID, vhsRecord) {

  try {
    const response = await fetch(`/vhs/api/v1/update/${vhsID.toString()}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vhsRecord)
    });

    const result = await response.json();
    console.log(`updated record ${vhsID}`);
    console.log("Results: " + JSON.stringify(data.results, null, 2));
    
    location.reload();
  } catch (error) {
    alert("Error updating VHS records: " + error.message);
  }
}


