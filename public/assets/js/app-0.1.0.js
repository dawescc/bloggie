console.log('hi!');

function formatDateWithMoment(isoString) {
    const momentDate = moment(isoString);
    const formattedDate = momentDate.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss z');
    const relativeTime = momentDate.fromNow();
  
    return `${formattedDate} (${relativeTime})`;
};