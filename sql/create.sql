CREATE DATABASE JazzMusic;

USE JazzMusic;

CREATE TABLE Address (
	AddressReference int AUTO_INCREMENT,
	Address1 varchar(255),
	Address2 varchar(255),
	City varchar(255),
	Postcode varchar(255),
	PRIMARY KEY (AddressReference)
);

CREATE TABLE Album (
    AlbumReference int AUTO_INCREMENT,
    AlbumName varchar (255),
    ReleaseDate date,
    Cost decimal,
    PRIMARY KEY (AlbumReference)
);

CREATE TABLE Artist (
    ArtistReference int AUTO_INCREMENT,
    ArtistsName varchar (255),
    Genre varchar (255),
    ArtistsAlbum int, 
    PRIMARY KEY (ArtistReference),
    FOREIGN KEY (ArtistsAlbum) REFERENCES Album(AlbumReference)
);

CREATE TABLE Orders (
    OrdersReference int AUTO_INCREMENT,
    Quantity int,
    OrderedAlbum int,
    MusicFormat varchar(255),
    Cost decimal,
    Customer varchar(255),
    PRIMARY KEY (OrdersReference),
    FOREIGN KEY (OrderedAlbum) REFERENCES Album(AlbumReference)
);

CREATE TABLE Delivery (
    Dispatch date,
    PlacedOrder int,
    Courier varchar(255),
    TrackingReference varchar(255) NOT NULL,
    ExpectedDelivery date,
    DeliveryAddress int,
    PRIMARY KEY (TrackingReference),
    FOREIGN KEY (PlacedOrder) REFERENCES Orders(OrdersReference),
    FOREIGN KEY (DeliveryAddress) REFERENCES Address(AddressReference)
);

CREATE TABLE Customer ( 
	Forename varchar(255),
	Surname varchar(255),
	DOB decimal,
	Email varchar(255) NOT NULL,
	PhoneNo varchar(255),
    CustomersAddress int,
    OrdersPlaced int,
	PRIMARY KEY (Email),
    FOREIGN KEY (CustomersAddress) REFERENCES Address(AddressReference),
    FOREIGN KEY (OrdersPlaced) REFERENCES Orders(OrdersReference)
);