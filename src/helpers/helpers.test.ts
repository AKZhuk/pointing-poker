import { creatLinkFromKey, delay, getRoomKeyFromURL, getTimeFromDate, idGenerator, validateURL } from "./helpers";


describe('Test for "helpers" functions', () => {
    it('Function "getRoomKeyFromURL" should working correctly', () => {
      expect(getRoomKeyFromURL('http://localhost:8080/?room=1633250395137')).toBe('1633250395137');
    });
    it('Function "validateURL" should working correctly', () => {
      expect(validateURL('http://localhost:8080/?room=1633250395137')).toBeTruthy();
      expect(validateURL('http://localhost:8080/?*test')).toBeFalsy();
    });
    it('Function "creatLinkFromKey" should working correctly', () => {
        expect(creatLinkFromKey('1633250395137')).toContain('1633250395137');
    });
    it('Function "idGenerator" should working correctly', () => {
        expect(idGenerator().length).toBeLessThan(7);
        expect(idGenerator().length).toBeGreaterThan(5);
    });
    it('Function "getTimeFromDate" should working correctly', () => {
        expect(getTimeFromDate(new Date('2021-10-03T08:58:11.995Z'))).toBe('12:58');
    });
    it('Function "delay" should working correctly', async () => {
        expect( await delay(1)).toBeUndefined();
    });
    
  });