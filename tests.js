const modules = require('./linkstations');

const assert = require('assert');

describe('Link station logic tests', () => {
	it('should return a link station with power 100', () => {
		assert.equal(modules.getBestLinkStationInfo(0,0), 'Best link station for point 0,0 is 0,0 with power 100');
	});

	it('should return a link station with power 49', () => {
		assert.equal(modules.getBestLinkStationInfo(14,3), 'Best link station for point 14,3 is 10,0 with power 49')
	});

	it('should not return a link station', () => {
		assert.equal(modules.getBestLinkStationInfo(26, 23), 'No link station within reach for 26,23');
	})

	it('should return a link station with power 81', () => {
		assert.equal(modules.getBestLinkStationInfo(7,0), 'Best link station for point 7,0 is 10,0 with power 81')
	});

	it('should return a link station with power 16', () => {
		assert.equal(modules.getBestLinkStationInfo(21,20), 'Best link station for point 21,20 is 20,20 with power 16')
	});
});

describe('Distance calculation tests', () => {
	it('should return distance 5', () => {
		assert.equal(modules.CalculationHelper.getDistance(new modules.Point(4, 3), new modules.Point(0,0)), 5)
	});

	it('should return distance 5', () => {
		assert.equal(modules.CalculationHelper.getDistance(new modules.Point(6, 5), new modules.Point(2,2)), 5)
	});

	it('should return distance 7', () => {
		assert.equal(modules.CalculationHelper.getDistance(new modules.Point(7, 4), new modules.Point(0, 4)), 7)
	});

	it('should return distance 0', () => {
		assert.equal(modules.CalculationHelper.getDistance(new modules.Point(0, 0), new modules.Point(0, 0)), 0)
	});


	it('should return NaN', () => {
		assert.equal(isNaN(modules.CalculationHelper.getDistance(new modules.Point(0, "gds"), new modules.Point(0, 0))), true)
	});
});

describe('Power calculation tests', () => {
	it('should return power 0', () => {
		assert.equal(modules.CalculationHelper.getPower(10, 4), 0)
	});

	it('should return power 0', () => {
		assert.equal(modules.CalculationHelper.getPower(10, 10), 0)
	});

	it('should return NaN', () => {
		assert.equal(isNaN(modules.CalculationHelper.getPower(10, "asd")), true);
	});
	
	it('should return power 49', () => {
		assert.equal(modules.CalculationHelper.getPower(13, 20), 49)
	});
	it('should return power 144', () => {
		assert.equal(modules.CalculationHelper.getPower(12, 24), 144)
	});
});