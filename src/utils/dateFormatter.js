
export const formatDate = (dateString, formatOption) => {
    const dateParts = dateString.split("-");
    const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
  
    let options;
    switch (formatOption) {
      case 'year':
        options = { year: 'numeric' };
        break;
      case 'year-month':
        options = { year: 'numeric', month: 'short' };
        break;
      case 'year-month-day':
        options = { year: 'numeric', month: 'short', day: 'numeric' };
        break;
      default:
        throw new Error('Invalid format option');
    }
  
    const formatter = new Intl.DateTimeFormat('en', options);
    return formatter.format(date);
  };