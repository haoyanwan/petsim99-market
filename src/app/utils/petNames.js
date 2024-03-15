export const formatName = (id, pt, sh) => {
    let namePrefix = '';
  
    // Check for 'pt' value and prepend the appropriate title.
    if (pt === 1) {
      namePrefix += 'Golden ';
    } else if (pt === 2) {
      namePrefix += 'Rainbow ';
    }
  
    // Check for 'sh' value and prepend 'Shiny' if not none.
    if (sh == true) {
      namePrefix += 'Shiny ';
    }
  
    // Return the constructed name with the 'id' at the end.
    return `${namePrefix}${id}`;
  };