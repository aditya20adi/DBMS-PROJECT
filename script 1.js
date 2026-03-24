fetch('/data')
.then(response => response.json())
.then(data => {
    const list = document.getElementById('userList');

    // create table
    const table = document.createElement('table');
    table.innerHTML = `<tr>
        <th>UID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Course</th>
    </tr>`;

    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.uid}</td>
                         <td>${user.name}</td>
                         <td>${user.age}</td>
                         <td>${user.course}</td>`;
        table.appendChild(row);
    });

    list.appendChild(table);
})
.catch(err => console.error('Error fetching data:', err));