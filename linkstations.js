/**
 * @author Antti Rautapää 27.9.2018
 *
 * Coding nut
 */


/**
 * Calculation helper 
 */
class CalculationHelper {
	/**
	 * @param  {Point}  a
	 * @param  {Point}  b
	 * @return {Double} distance between the two points
	 */
	static getDistance(a, b) {
		// pythagoras' clause to calculate the distance
		return Math.sqrt(Math.pow(Math.abs(a.getX() - b.getX()), 2) + Math.pow((a.getY() - b.getY()), 2));
	}

	/**
	 * @param  {Number} distance
	 * @param  {Number} link station reach
	 * @return {Number} power of the link station
	 */
	static getPower(distance, reach) {
		if(distance > reach ) {
			return 0;
		} else {
			return Math.pow((reach - distance), 2);
		}
	}
}

/**
 * Base class for coordinate fetching
 */
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

}

/**
 * Link station class that has reach attribute 
 */
class LinkStation extends Point{
	constructor(x, y, reach) {
		super(x, y);
		this.reach = reach;
	}

	getReach() {
		return reach;
	}
}

/**
 * Finder class that gets all the link stations and current location
 */
class LinkStationFinder {
	constructor(currentLocation, linkStations) {
		this.currentLocation = currentLocation;
		this.linkStations = linkStations;
	}

	getCurrentLocation() {
		return this.currentLocation;
	}

	setLinkStations(linkStations) {
		this.linkStations = linkStations;
	}

	/**
	 * Calculates the best link station with parameters
	 * 
	 * @return {String} the result
	 */
	calculateBestLinkStation() {
		let message = `No link station within reach for ${this.currentLocation.x},${this.currentLocation.y}`;

		const filteredLinkStations = [];

		// loop through the link stations 
		this.linkStations.forEach((linkStation) => {
			const distance = CalculationHelper.getDistance(this.currentLocation, linkStation);

			if(distance < linkStation.reach) {
				filteredLinkStations.push({
					linkStation : linkStation,
					distance : distance,
					power : CalculationHelper.getPower(distance, linkStation.reach)
				});
			} 
		});

		// sort the link stations by power
		filteredLinkStations.sort((a, b) => {
			return b.power - a.power
		});

		// and if there were any link stations, they are all sorted and get the first one from the pile
		if(filteredLinkStations.length > 0) {
			const best = filteredLinkStations[0];

			message = `Best link station for ` +
						`point ${this.currentLocation.x},${this.currentLocation.y} ` +
						`is ${best.linkStation.x},${best.linkStation.y} with power ${best.power}`;
		}

		return message;
	}
}

/**
 * @param  {Number} x the x-coordinate
 * @param  {Number} y the y-coordinate
 * @return {String}  message
 */
function getBestLinkStationInfo(x, y) {
	// initialize link station array,
	// this could be easily replacable with API Call etc.
	const linkStations = [new LinkStation(0, 0, 10), new LinkStation(20, 20, 5), new LinkStation(10, 0, 12)];
	
	// initialize link station finder
	const linkStationFinder = new LinkStationFinder(new Point(x, y), linkStations);

	// calculate and get the status
	const message = linkStationFinder.calculateBestLinkStation();

	// return the message that was given
	return message;
}

// export modules for testing
module.exports = { getBestLinkStationInfo, CalculationHelper, Point, LinkStation }

