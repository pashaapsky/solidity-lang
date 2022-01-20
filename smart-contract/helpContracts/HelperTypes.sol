// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract HelperTypes {
    //1.VALUE TYPES - типы значений
    uint myNumber = 5;
    bool myBool = true;
    string myString = "string";
    int256 myNegativeNumber = -5;
    address myAddress = 0x3D926436b967EBC692836C5C2b3a06243fB287C6;
    address payable myPayableAddress; // Same as address, but with the additional members transfer and send. (is an address you can send Ether to)
    bytes32 myBytes = "cat";

    //1.5 enum
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    ActionChoices choice;
    ActionChoices constant defaultChoice = ActionChoices.GoStraight;

    //*functions
    //function (<parameter types>) {external, public, internal or private} [pure|view|payable] [returns (<return types>)]

    // - public - функцию можно получить везде
    // - external - функцию можно вызвать только вне контракта
    // - internal - функцию можно вызвать только другая функция внутри контракта
    // - private - функция, которая может быть вызвана только внутри контракта

    //pure functions can be converted to view and non-payable functions
    //view functions can be converted to non-payable functions
    //payable functions can be converted to non-payable functions

    //State Mutability
    // - view -> используем для чтения данных из state, но не модифицируют state
    // - pure -> используют для каких-то вычислений (работает с аргументами), не читает данные из state и не модифицирует state

    function getChoice() public view returns (ActionChoices) {
        return choice;
    }

    function getDefaultChoice() public pure returns (uint) {
        return uint(defaultChoice);
    }

    //2.REFERENCE TYPES - ссылочные типы
    //2.1 Data location - где хранится - memory, storage and calldata

    //Если вы используете ссылочный тип, вы всегда должны явно указывать область данных, где хранится тип:
    // - memory(память) (чье время жизни ограничено вызовом внешней функции),
    // - storage(хранилище) (место, где хранятся переменные состояния, где время жизни ограничено сроком действия контракта)
    // - calldata (специальное расположение данных, содержащее аргументы функции).

    //2.2 Arrays
    // динамический массив - размер любой
    uint[] arrayuint = [1,2,3];
    // фиксированный
    uint[2] testarray;

    //2.3 Struct
    struct MyStruct {
        address addr;
        uint amount;
    }

    //3. MAPPING TYPES - типы сопоставления
    // чтобы найти номер по имени человека
    mapping(string => uint) public nameToMyNumber;

//    function addPerson(string memory _name, uint _myNumber) public {
//        people.push(People(_myNumber, _name));
//        nameToMyNumber[_name] = _myNumber;
//    }
}
