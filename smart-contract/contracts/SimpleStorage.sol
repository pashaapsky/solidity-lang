// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

contract SimpleStorage {
    //init = 0
    uint myNumber;

    struct People {
        uint myNumber;
        string name;
    }

    People[] public people;
    mapping(string => uint) public nameToMyNumber;

    function store(uint _myNumber) public returns(uint) {
        myNumber = _myNumber;
        return _myNumber;
    }

    function retrieve() public view returns(uint) {
        return myNumber;
    }

    function addPerson(string memory _name, uint _myNumber) public {
        people.push(People(_myNumber, _name));
        nameToMyNumber[_name] = _myNumber;
    }
}