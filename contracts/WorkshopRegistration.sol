// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WorkshopRegistration {

    // =====================================================
    // OWNER
    // =====================================================

    address public owner;

    // =====================================================
    // STRUCTS
    // =====================================================

    struct Workshop {
        string title;
        string description;
        string date;
        uint256 totalSeats;
        uint256 remainingSeats;
    }

    struct Student {
        string name;
        string rollNo;
        string department;
        address wallet;
    }

    // =====================================================
    // STATE VARIABLES
    // =====================================================

    Workshop public workshop;

    Student[] private participants;

    address[] private participantAddresses;

    mapping(address => bool) public hasRegistered;

    mapping(string => bool) public rollRegistered;

    mapping(address => Student) public studentDetails;

    // =====================================================
    // EVENTS
    // =====================================================

    event WorkshopCreated(
        string title,
        uint256 totalSeats
    );


    event SeatsDecreased(
    uint256 amount
);

    event StudentRegistered(
        address indexed wallet,
        string name,
        string rollNo
    );

    event SeatsIncreased(
        uint256 amount
    );

    event WorkshopReset();

    // =====================================================
    // MODIFIER
    // =====================================================

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor() {

        owner = msg.sender;

        workshop = Workshop({
            title: "Blockchain Workshop",
            description: "Learn Ethereum & Solidity",
            date: "25 July 2026",
            totalSeats: 5,
            remainingSeats: 5
        });

        emit WorkshopCreated(
            workshop.title,
            workshop.totalSeats
        );
    }

    // =====================================================
    // REGISTER
    // =====================================================

    function register(

        string memory _name,
        string memory _rollNo,
        string memory _department

    ) public {

        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_rollNo).length > 0, "Roll Number is required");
        require(bytes(_department).length > 0, "Department is required");

        require(
            !hasRegistered[msg.sender],
            "Already Registered"
        );

        require(
            !rollRegistered[_rollNo],
            "Roll Number Already Registered"
        );

        require(
            workshop.remainingSeats > 0,
            "No Seats Available"
        );

        Student memory student = Student({
            name: _name,
            rollNo: _rollNo,
            department: _department,
            wallet: msg.sender
        });

        participants.push(student);

        participantAddresses.push(msg.sender);

        studentDetails[msg.sender] = student;

        hasRegistered[msg.sender] = true;

        rollRegistered[_rollNo] = true;

        workshop.remainingSeats--;

        emit StudentRegistered(
            msg.sender,
            _name,
            _rollNo
        );
    }

 // =====================================================
// ADMIN FUNCTIONS
// =====================================================

function increaseSeats(
    uint256 amount
)
    public
    onlyOwner
{
    require(
        amount > 0,
        "Amount must be greater than 0"
    );

    workshop.totalSeats += amount;
    workshop.remainingSeats += amount;

    emit SeatsIncreased(amount);
}

function decreaseSeats(
    uint256 amount
)
    public
    onlyOwner
{
    require(
        amount > 0,
        "Invalid amount"
    );

    uint256 registered =
        workshop.totalSeats - workshop.remainingSeats;

    require(
        workshop.totalSeats >= amount,
        "Amount exceeds total seats"
    );

    require(
        workshop.totalSeats - amount >= registered,
        "Cannot remove occupied seats"
    );

    workshop.totalSeats -= amount;

    workshop.remainingSeats =
        workshop.totalSeats - registered;

    emit SeatsDecreased(amount);
}

function resetWorkshop()
    public
    onlyOwner
{
    for (
        uint256 i = 0;
        i < participantAddresses.length;
        i++
    ) {

        address wallet = participantAddresses[i];

        rollRegistered[
            studentDetails[wallet].rollNo
        ] = false;

        hasRegistered[wallet] = false;

        delete studentDetails[wallet];
    }

    delete participants;

    delete participantAddresses;

    workshop.remainingSeats =
        workshop.totalSeats;

    emit WorkshopReset();
}



    // =====================================================
    // GETTERS
    // =====================================================

    function getWorkshop()
        public
        view
        returns (

            string memory,
            string memory,
            string memory,
            uint256,
            uint256

        )
    {

        return (

            workshop.title,
            workshop.description,
            workshop.date,
            workshop.totalSeats,
            workshop.remainingSeats

        );
    }

    function getParticipantCount()
        public
        view
        returns (uint256)
    {

        return participants.length;
    }

    function getParticipant(
        uint256 index
    )
        public
        view
        returns (

            string memory,
            string memory,
            string memory,
            address

        )
    {

        require(
            index < participants.length,
            "Invalid participant index"
        );

        Student memory s = participants[index];

        return (

            s.name,
            s.rollNo,
            s.department,
            s.wallet

        );
    }

    function isRegistered(
        address user
    )
        public
        view
        returns (bool)
    {

        return hasRegistered[user];
    }

    function getOwner()
        public
        view
        returns(address)
    {

        return owner;
    }

    function getRemainingSeats()
        public
        view
        returns(uint256)
    {

        return workshop.remainingSeats;
    }

    function getTotalSeats()
        public
        view
        returns(uint256)
    {

        return workshop.totalSeats;
    }
}

