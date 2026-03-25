fetch('/data')
  .then(response => response.json())
  .then(data => {
    let users = data;
    let editingId = null;

    const container = document.getElementById('userList');

    function renderTable() {
      container.innerHTML = '';
      const table = document.createElement('table');
      table.className = 'table table-striped table-bordered';
      table.innerHTML = `
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector('tbody');

      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.uid}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.course}</td>
          <td>
            <button class="btn btn-sm btn-warning">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        `;
        // Edit button
        row.querySelector('.btn-warning').addEventListener('click', () => editUser(user.uid));
        // Delete button
        row.querySelector('.btn-danger').addEventListener('click', () => deleteUser(user.uid));
        tbody.appendChild(row);
      });

      container.appendChild(table);
    }

    function editUser(uid) {
      const user = users.find(u => u.uid === uid);
      document.getElementById('username').value = user.name;
      document.getElementById('age').value = user.age;
      document.getElementById('course').value = user.course;
      editingId = uid;
    }

    function deleteUser(uid) {
      if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.uid !== uid);
        renderTable();
      }
    }

    function addOrUpdateUser() {
      const name = document.getElementById('username').value.trim();
      const age = parseInt(document.getElementById('age').value);
      const course = document.getElementById('course').value.trim();

      if (!name || isNaN(age) || !course) return alert('All fields are required!');

      if (editingId) {
        const user = users.find(u => u.uid === editingId);
        user.name = name;
        user.age = age;
        user.course = course;
        editingId = null;
      } else {
        const uid = users.length ? Math.max(...users.map(u => u.uid)) + 1 : 101;
        users.push({ uid, name, age, course });
      }

      document.getElementById('username').value = '';
      document.getElementById('age').value = '';
      document.getElementById('course').value = '';
      renderTable();
    }

    document.getElementById('addUser').addEventListener('click', addOrUpdateUser);
    renderTable();
  })
  .catch(err => console.error('Error fetching data:', err));
