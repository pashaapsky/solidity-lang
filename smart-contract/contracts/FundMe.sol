//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// используем import, вместо объявления целого интерфейса 5-36
// "@@chainlink/contracts" = npm i @chainlink/contracts
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

//контракт позволяет накапливать на адресах сберегателей деньги, и потом выводить их на счет создателя контракта
contract FundMe {
    //используем метод SafeMath для типов uint256 для Solidity <0.8.0, от переполнения int при вычеслениях
    using SafeMath for uint256;

    //адресс контракта-агрегатора в сети rinkeby
    address testNetworkAddress = 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;

    address public owner; //адресс владельца
    address[] public funders; //массив с адресами сберегателей
    AggregatorV3Interface public priceFeed;

    //mapping
    mapping(address => uint) public addressToAmountFunded;

    //при инициализации контракта, задаем owner
    constructor(address _priceFeed) public {
        //создаем для работы на локале, когда нет доступа к контрактам тест-сетей
        priceFeed = AggregatorV3Interface(_priceFeed);

        owner = msg.sender;
    }

    //внести сбережения
    function fund() public payable {
        // $5
        uint minimumUSD = 5 * 10 ** 18;
        require(getConversionRate(msg.value) >= minimumUSD, "You need to spend more ETH");

        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    //получаем версию контракта, через вызов его метода version();
    function getVersion() public view returns(uint) {
        return priceFeed.version();
    }

    //получаем последнюю стоимость 1 ETH в USD
    function getPriceInWei() public view returns(uint) {
        // используем только 1 переменную из 5 возвращаемых
        // (uint80 roundId,int256 answer,uint256 startedAt,uint256 updatedAt,uint80 answeredInRound) = priceFeed.latestRoundData();
        (,int256 answer,,,) = priceFeed.latestRoundData();

        // подводим к размерности wei 18 знаков
        return uint(answer * 10 ** 10);
    }

    function getConversionRate(uint ethAmount) public view returns (uint) {
        uint ethPrice = getPriceInWei();
        uint ethAmountInUsd = (ethPrice * ethAmount) / 10 ** 18;

        return ethAmountInUsd;
    }

    function getEntranceFee() public view returns (uint) {
        uint minimumUSD = 50 * 10**18;
        uint price = getPriceInWei();
        uint precision = 1 * 10**18;
        return (minimumUSD * precision) / price;
    }

    //only for contract admin/owner modifier
    modifier onlyOwner {
        require(msg.sender == owner);
        _; //продолжение кода
    }

    //возвращаем деньги контракта на свой кошелек
    function withdraw() payable onlyOwner public {
        //only for contract admin/owner
        // require(msg.sender == owner);
        payable(msg.sender).transfer(address(this).balance);

        //обнуляем адреса с деньгами всех сберегателей
        for (uint funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            addressToAmountFunded[funders[funderIndex]] = 0;
        }

        //зануляем массив сберегателей
        funders = new address[](0);
    }
}