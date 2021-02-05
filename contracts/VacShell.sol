// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

/**
 * @title VacShell
 * @dev Store and retrieve vaccine container statistics via blockchain
 */

contract VacShell {

	/**
	 * A container for vaccines
	 */
	struct Container {
		int8 temp; // current temperature in degrees Celcius
		bool efficacy; // if the vaccines in the container are effective or not
		bytes8[] vaccines; // ID of the vaccines in the container
	}

	/* All containers
	 * Using the address of the sending device as key
	 */
	mapping(address => Container) public containers; 

	/**
	 * @dev Update the temperature of the sender's container
	 * @param _temp new temperature
	 */
	function setTemp(int8 _temp) public{
		containers[msg.sender].temp = _temp;
	}

	/**
	 * @dev Update the vaccine array in the container
	 * @param _vaccines incoming vaccine array
	 */
	function updateVaccines(bytes8[] memory _vaccines) public{
		containers[msg.sender].vaccines = _vaccines;
	}

	/**
	 * @dev Declare all vaccines in the container ineffective
	 */
	function kill() public {
		containers[msg.sender].efficacy = false;
	}

	/**
	 * @dev Initiate a container
	 */
	function init() public {
		containers[msg.sender].temp = 0;
		containers[msg.sender].efficacy = true;
		delete containers[msg.sender].vaccines;
	}
	
	/**
	 *  @dev Get all vaccines in a container
	 */
	function vaccinesAt(address _addr) public returns (bytes8[]) {
	    return containers[_addr].vaccines;
	}

}