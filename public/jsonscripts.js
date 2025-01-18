
function manage(tableId = '', type = '', form) 
{
  fetchrecords(tableId, type, form);
}

// Λειτουργία για την ανάκτηση και εμφάνιση των εγγραφών
function fetchrecords(tableId = '', type = '', form) 
{
  fetch('/records')
  .then(response => response.json())
  .then(data => 
  {
    const recordsList = document.getElementById(tableId).querySelector('tbody');
    recordsList.innerHTML = '';

    const filteredData = data.filter(record => 
    {
      const typeMatch = type ? record.type === type : true;
      return typeMatch;
    });

    filteredData.forEach(record => 
    {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = record.id;
      row.appendChild(idCell);

      const typeCell = document.createElement('td');
      typeCell.textContent = record.type;
      row.appendChild(typeCell);

      const categoryCell = document.createElement('td');
      categoryCell.textContent = record.category;
      row.appendChild(categoryCell);

      const titleCell = document.createElement('td');
      titleCell.textContent = record.title;
      row.appendChild(titleCell);

      const urlCell = document.createElement('td');
      const link = document.createElement('a');
      link.href = record.url;
      link.textContent = record.url;
      link.target = '_blank'; // Ανοίγει το σύνδεσμο σε νέα καρτέλα
      urlCell.appendChild(link);
      row.appendChild(urlCell);

      // Δημιουργία κουμπιού διαγραφής
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleterecord(record.id, tableId, record.type, form));
      deleteCell.appendChild(deleteButton);
      
      // Δημιουργία κουμπιού επεξεργασίας
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => loadEditForm(record, form));
      deleteCell.appendChild(editButton);
      row.appendChild(deleteCell);

      recordsList.appendChild(row);
    });
  })
  .catch(error => console.error('Error:', error));
}

// Λειτουργία για τη φόρτωση των δεδομένων της εγγραφής στη φόρμα για επεξεργασία
function loadEditForm(record, form) 
{
  document.getElementById('formMode'+form).value = 'edit';
  document.getElementById('id'+form).value = record.id;
  document.getElementById('type'+form).value = record.type;
  document.getElementById('category'+form).value = record.category;
  document.getElementById('title'+form).value = record.title;
  document.getElementById('url'+form).value = record.url;
}

// Λειτουργία για τη διαγραφή εγγραφής
function deleterecord(id, tableId, type, form) 
{
  fetch(`/delete-record/${id}`,
  {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => 
  {
    alert(data.message);
    fetchrecords(tableId, type, form); // Ανανεώνει τη λίστα των εγγραφών
  })
  .catch(error => console.error('Error:', error));
}
// Φόρτωση εγγραφών κατά τη φόρτωση της σελίδας
// Λειτουργία για την υποβολή της φόρμας 1
const form1 = document.getElementById(document.getElementById('formId1').value);

form1.addEventListener('submit', (event) => 
{
  event.preventDefault();

  const mode = document.getElementById('formMode1').value;
  const tableId = document.getElementById('tableId1').value;
  const formId = document.getElementById('formId1').value;
  const id = document.getElementById('id1').value;
  const type = document.getElementById('type1').value;
  const category = document.getElementById('category1').value;
  const title = document.getElementById('title1').value;
  const url = document.getElementById('url1').value;

  const record = { id, type, category, title, url };

  if (mode === 'add') 
  {
    // Λειτουργία προσθήκης
    fetch('/add-record', 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
    .then(response => response.json())
    .then(data => 
    {
      alert(data.message);
      fetchrecords(tableId, type, 1);
      form1.reset();
    })
    .catch(error => console.error('Error:', error));
  } 
  else if (mode === 'edit') 
  {
    // Λειτουργία επεξεργασίας
    fetch(`/update-record/${id}`, 
    {
      method: 'PUT',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, category, title, url }),
    })
    .then(response => response.json())
    .then(data => 
    {
      alert(data.message);
      fetchrecords(tableId, type, 1);
      form1.reset();
      document.getElementById('formMode1').value = 'add'; // Επαναφορά λειτουργίας σε προσθήκη
    })
    .catch(error => console.error('Error:', error));
  }
});

// Λειτουργία για την υποβολή της φόρμας 2
const form2 = document.getElementById(document.getElementById('formId2').value);

form2.addEventListener('submit', (event) => 
{
  event.preventDefault();

  const mode = document.getElementById('formMode2').value;
  const tableId = document.getElementById('tableId2').value;
  const formId = document.getElementById('formId2').value;
  const id = document.getElementById('id2').value;
  const type = document.getElementById('type2').value;
  const category = document.getElementById('category2').value;
  const title = document.getElementById('title2').value;
  const url = document.getElementById('url2').value;

  const record = { id, type, category, title, url };

  if (mode === 'add') 
  {
    // Λειτουργία προσθήκης
    fetch('/add-record', 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
    .then(response => response.json())
    .then(data => 
    {
      alert(data.message);
      fetchrecords(tableId, type, 2);
      form2.reset();
    })
    .catch(error => console.error('Error:', error));
  } 
  else if (mode === 'edit') 
  {
    // Λειτουργία επεξεργασίας
    fetch(`/update-record/${id}`, 
    {
      method: 'PUT',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, category, title, url }),
    })
    .then(response => response.json())
    .then(data => 
    {
      alert(data.message);
      fetchrecords(tableId, type, 2);
      form2.reset();
      document.getElementById('formMode2').value = 'add'; // Επαναφορά λειτουργίας σε προσθήκη
    })
    .catch(error => console.error('Error:', error));
  }
});

// Λειτουργία για την εμφάνιση των εγγραφών σε πίνακα με φιλτράρισμα κατηγορίας
function displayrecordsInTable(tableId, type = '', category = '') 
{
  fetch('/records')
  .then(response => response.json())
  .then(data => 
  {
    const tbody = document.getElementById(tableId).querySelector('tbody');
    tbody.innerHTML = ''; // Καθαρισμός του πίνακα πριν την προσθήκη νέων δεδομένων

    // Φιλτράρισμα εγγραφών αν δοθούν κατηγορία ή τύπος
    const filteredData = data.filter(record => 
    {
      const categoryMatch = category ? record.category === category : true;
      const typeMatch = type ? record.type === type : true;
      return categoryMatch && typeMatch;
    });

    filteredData.forEach(record => 
    {
      const row = document.createElement('tr');

      const titleCell = document.createElement('td');
      const link = document.createElement('a');
      link.href = record.url;
      link.textContent = record.title;
      link.target = '_blank'; // Ανοίγει το σύνδεσμο σε νέα καρτέλα
      titleCell.appendChild(link);
      row.appendChild(titleCell);

      tbody.appendChild(row);
    });
  })
  .catch(error => console.error('Error:', error));
}

// Κλήση της λειτουργίας κατά τη φόρτωση της σελίδας για εμφάνιση όλων των εγγραφών
document.addEventListener('DOMContentLoaded', () => displayrecordsInTable('recordsTable1'));
