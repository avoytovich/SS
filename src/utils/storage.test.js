import Storage from './storage';

describe('storageActions tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get item from storage', () => {
    localStorage.setItem('storageItemName', JSON.stringify('storageSavedData'));

    const expectedData = 'storageSavedData';
    const name = 'storageItemName';

    const data = Storage.get(name);

    expect(data).toEqual(expectedData);
    expect(localStorage.getItem).toHaveBeenLastCalledWith(name);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should set item from storage', () => {
    Storage.set('storageItemName', 'storageSavedData');

    const expectedData = JSON.stringify('storageSavedData');
    const name = 'storageItemName';

    const data = localStorage.getItem(name);

    expect(data).toEqual(expectedData);
  });

  it('should delete item from storage', () => {
    localStorage.setItem('storageItemName', JSON.stringify('storageSavedData'));
    Storage.remove('storageItemName');

    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
});
