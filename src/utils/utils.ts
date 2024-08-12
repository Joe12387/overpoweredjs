export const getSpecificType = (variable: unknown) => {
  const typeofVariable = typeof variable;
  if (typeofVariable === 'object') {
    if (variable === null) {
      return 'null';
    }
    if (Array.isArray(variable)) {
      return 'array';
    }
  }
  if (typeofVariable === 'number') {
    if (variable === Infinity) {
      return 'infinity';
    }
    if (variable === -Infinity) {
      return '-infinity';
    }
    if (isNaN(variable as number)) {
      return 'nan';
    }
  }
  return typeofVariable;
};

export const getSpecificTypeAndValue = (variable: unknown) => {
  return {
    type: getSpecificType(variable),
    value: variable,
  };
};

export const stringify = (value: any) => {
  if (typeof JSON === 'object' && typeof JSON.stringify === 'function') {
      return JSON.stringify(value);
  }

  function escapeString(str: string): string {
      return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  if (value === null) {
      return 'null';
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
  }
  if (typeof value === 'string') {
      return escapeString(value);
  }
  if (typeof value === 'undefined') {
      return 'null';
  }
  if (Array.isArray(value)) {
      const arrayValues = value.map(item => (typeof item === 'undefined' ? 'null' : stringify(item))).join(',');
      return '[' + arrayValues + ']';
  }
  if (typeof value === 'object') {
      const objectKeys = Object.keys(value);
      const objectValues = objectKeys
          .filter(key => typeof value[key] !== 'undefined')
          .map(key => escapeString(key) + ':' + stringify(value[key]))
          .join(',');
      return '{' + objectValues + '}';
  }
  return 'null'; // fallback for unsupported types
};
