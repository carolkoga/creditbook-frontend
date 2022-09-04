export function factoryOptionReactSelect(pathValue: string, pathLabel: string, data: any) {
  const splittedValue = pathValue.split('.');
  const splittedLabel = pathLabel.split('.');
  let currentDataValue = data;
  let currentDataLabel = data;

  splittedValue.forEach((path: string) => {
    currentDataValue = currentDataValue[path];
  });

  splittedLabel.forEach((path: string) => {
    currentDataLabel = currentDataLabel[path];
  });

  return { value: currentDataLabel, label: currentDataLabel };
}
