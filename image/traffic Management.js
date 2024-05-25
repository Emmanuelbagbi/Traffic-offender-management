

$(document).ready(function () {
    const offenders = [];

    function renderOffenders() {
        const offendersList = $('#offendersList');
        offendersList.empty();
        offenders.forEach((offender, index) => {
            offendersList.append(`
                <tr>
                    <td>${offender.name}</td>
                    <td>${offender.offense}</td>
                    <td>
                        <button class="updateButton" data-index="${index}">Update</button>
                        <button class="deleteButton" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    $('#offenderForm').on('submit', function (e) {
        e.preventDefault();
        const name = $('#offenderName').val();
        const offense = $('#offense').val();
        offenders.push({ name, offense });
        renderOffenders();
        this.reset();
    });

    $('#offendersList').on('click', '.updateButton', function () {
        const index = $(this).data('index');
        const name = prompt('Enter new name:', offenders[index].name);
        const offense = prompt('Enter new offense:', offenders[index].offense);
        if (name && offense) {
            offenders[index] = { name, offense };
            renderOffenders();
        }
    });

    $('#offendersList').on('click', '.deleteButton', function () {
        const index = $(this).data('index');
        offenders.splice(index, 1);
        renderOffenders();
    });

    $('#searchBar').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        const filteredOffenders = offenders.filter(offender => 
            offender.name.toLowerCase().includes(searchTerm) ||
            offender.offense.toLowerCase().includes(searchTerm)
        );
        const offendersList = $('#offendersList');
        offendersList.empty();
        filteredOffenders.forEach((offender, index) => {
            offendersList.append(`
                <tr>
                    <td>${offender.name}</td>
                    <td>${offender.offense}</td>
                    <td>
                        <button class="updateButton" data-index="${index}">Update</button>
                        <button class="deleteButton" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
        });
    });
});
