const moment = require('moment');

function generateTimeSlots(startTime, endTime, duration) {
    let slots = [];
    let current = moment(startTime, "HH:mm");

    const end = moment(endTime, "HH:mm");

    while (current.isBefore(end)) {
        let next = moment(current).add(duration, 'minutes');
        if (next.isAfter(end)) break;

        slots.push({
            start_time: current.format("HH:mm"),
            end_time: next.format("HH:mm")
        });

        current = next;
    }

    return slots;
}

module.export = generateTimeSlots();