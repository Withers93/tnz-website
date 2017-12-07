$(function () {

    var vehicles = null,
        vehicleList = $('.vehicle-list'),
        container = $('.container'),
        mainBtn = $('.main-btn'),
        landingForm = $('.landing-form'),
        landingInfo = $('.landing-info'),
        partyInput = $('#party-input'),
        durationInput = $('#duration-input'),
        selectedVehicleDisplay = $('.selected-vehicle--display'),
        fuelInput = $('.fuel-input'),
        distanceSelect = $('.distance-select'),
        distanceInput = $('.distance-input'),
        BackBtn = $('.back-btn'),
        selectedDistance = null,
        inputDistance = null;

    function init() {
        $.getJSON('json/vehicles.json', function (data) {
            vehicles = data.vehicles;
        });
    }

    function getHTMLVehicleItem(vehicle) {
        return `<div class="vehicle-list--item">
    <div><img class="vehicle-image" src="${vehicle.imageURL}"></div>
                <div class="vehicle-name">${vehicle.name}</div>
                <div class="vehicle-description">
                <div class="vehicle-info">${vehicle.minNumOfDays} - ${vehicle.maxNumOfDays} days rental</div>
                <div class="vehicle-info">${vehicle.minNumOfPeople} - ${vehicle.maxNumOfPeople} people</div>
                <div class="vehicle-info">${vehicle.fuel}L/100km</div>
                <div class="vehicle-info">${vehicle.description}L/100km</div>
                </div>
                <button data-name="${vehicle.name}" class="vehicle-button" type="button">SELECT</button>
            </div>`
    }

    function getHTMLSelectedVehicleItem(vehicle) {
        return `<div data-name="${vehicle.name}" class="selected-vehicle--item">
    <div><img class="selected-vehicle--image" src="${vehicle.imageURL}"></div>
                <div class="selected-vehicle--name">${vehicle.name}</div>
                <div class="selected-vehicle--description">
                <div class="selected-vehicle--info">${vehicle.minNumOfDays} - ${vehicle.maxNumOfDays} days rental</div>
                <div class="selected-vehicle--info">${vehicle.minNumOfPeople} - ${vehicle.maxNumOfPeople} people</div>
                <div class="selected-vehicle--info">${vehicle.fuel}L/100km</div>
                <div class="selected-vehicle--info">${vehicle.description}L/100km</div>
                </div>
            </div>`
    }

    function displayVehicles(filteredOptions) {
        var s = '';
        $.each(filteredOptions, function (i, vehicle) {
            s += getHTMLVehicleItem(vehicle);
        });
        vehicleList.html(s);
        var vehicleArray = filteredOptions;
        var vehicleListItems = $('.vehicle-list--item');
        vehicleButtons = $('.vehicle-button');
        $.each(vehicleButtons, function (i, vehicleButton) {
            $(this).on('click', function () {
                var selectedVehicleName = vehicleButton.getAttribute('data-name');
                selectedVehicle = findVehicleByName(vehicleArray, selectedVehicleName);
                $(container).css('height', '100vh');
                $(vehicleList).css('display', 'none');
                $(landingForm).css('display', 'none');
                displaySelectedVehicle(selectedVehicle);
                $(fuelInput).css('display', 'inline-block');
                $(BackBtn).css('display', 'inline-block');
                $(selectedVehicleDisplay).css('display', 'inline-block');
                getDistanceValue();
            });
        });
    }

    $(mainBtn).on('click', function () {
        $(landingInfo).css("display", "none");
        $(vehicleList).css("display", "inline-block");
        filterByNoOfPeople(vehicles, partyInput);
        filterByDuration(newOptions);
        $(this).closest('form').find("input[type=text], textarea").val("");
    });

    $(BackBtn).on('click', function () {
        $(vehicleList).css("display", "inline-block");
        $(landingForm).css('display', 'inline-block');
        $(fuelInput).css('display', 'none');
        $(BackBtn).css('display', 'none');
        $(selectedVehicleDisplay).css('display', 'none');
        $(container).css('height', 'auto');
    });

    function filterByNoOfPeople() {
        newOptions = [];
        var partyInputVal = parseInt(partyInput.val());
        $.each(vehicles, function (i, vehicle) {
            if (vehicle.minNumOfPeople <= partyInputVal && partyInputVal <= vehicle.maxNumOfPeople) {
                newOptions.push(vehicle);
            }
        });
        return newOptions;
    }

    function filterByDuration(newOptions) {
        var filteredOptions = [];
        var durationInputVal = parseInt(durationInput.val());
        $.each(newOptions, function (i, vehicle) {
            if (vehicle.minNumOfDays <= durationInputVal && durationInputVal <= vehicle.maxNumOfDays) {
                filteredOptions.push(vehicle);
            }
        });
        displayVehicles(filteredOptions);
    }

    function findVehicleByName(vehicleArray, selectedVehicleName) {
        for (var i = 0; i < vehicleArray.length; i++) {
            var name = vehicleArray[i].name;
            if (name === selectedVehicleName) {
                return vehicleArray[i]
            }
        }
        return null;
    }

    function displaySelectedVehicle(selectedVehicle) {
        var s = '';
        s += getHTMLSelectedVehicleItem(selectedVehicle);
        selectedVehicleDisplay.html(s);
    }

    function getDistanceValue() {
        var selectedDistanceInput = $('.distance-select');
        var inputDistanceInput = $('.distance-input');
        $('.distance-select').on('change', function () {
            var selectedDistance = selectedDistanceInput.find(':selected').val();
            if (selectedDistance != null) {
            inputDistanceInput.val("");
            distanceValue = selectedDistance;
        };
            
        });
        $('.distance-input').on('blur', function () {
            var inputDistance = inputDistanceInput.val();
            if (inputDistance != null) {
            selectedDistanceInput.val( '' );
            distanceValue = inputDistance;
        };
        });
    }

    init();
});