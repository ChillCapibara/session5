"use strict";
// Create a Parcel interface to represent an entity in a package delivery system.
// The package contains the following properties:
// · id: integer number that can not be changed)
// · weight: float value
// · dimensions: 'Dimensions' interface
// · description: optional value
// · sender: can store sender's id number or full name
// · status: enum `PackageStatus`
// · deliver: function
// · statusName: getter
// The deliver function takes a boolean parameter isSuccess with no return value.
// The statusName getter returns the parcel's status name as a string.
// The Dimensions interface consists of length, width and height, all of which can be floating-point numbers.
// The PackageStatus enum has the following possible values: Pending, InTransit, Delivered, Lost.
var PackageStatus;
(function (PackageStatus) {
    PackageStatus[PackageStatus["Pending"] = 0] = "Pending";
    PackageStatus[PackageStatus["InTransit"] = 1] = "InTransit";
    PackageStatus[PackageStatus["Delivered"] = 2] = "Delivered";
    PackageStatus[PackageStatus["Lost"] = 3] = "Lost";
})(PackageStatus || (PackageStatus = {}));
const item = {
    id: 224,
    weight: 22.5,
    dimensions: {
        length: 105,
        width: 44,
        height: 50.5
    },
    sender: "Vlad Tymo",
    description: "Super power inside.",
    status: PackageStatus.Pending,
    deliver(isSuccess) {
        this.status = isSuccess ? PackageStatus.Delivered : PackageStatus.Lost;
    },
    get statusName() {
        return PackageStatus[this.status];
    }
};
item.deliver(true);
console.log(item.statusName);
