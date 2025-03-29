import { createItem, getItemsByPrice, getItemsByDuration } from "../../controllers/itemController";
import { Request, Response } from "express";
import { Item } from "../../models/item";

jest.mock("../../models/item");

describe("createItem", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        name: "Test Item",
        description: "Test Description",
        price: 100,
        pic: "test-pic-url",
        duration: 10,
      },
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = { description: "Test Description", duration: 10 };

    await createItem(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Name, description, and duration are required",
    });
  });

  it("should create an item and return 201 status", async () => {
    const mockItem = {
      id: 1,
      name: "Test Item",
      description: "Test Description",
      price: 100,
      pic: "test-pic-url",
      duration: 10,
    };

    (Item.create as jest.Mock).mockResolvedValue(mockItem);

    await createItem(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Item created successfully",
      data: expect.objectContaining({
      id: 1,
      name: "Test Item",
      description: "Test Description",
      price: 100,
      pic: "test-pic-url",
      duration: 10,
      }),
    });
  });

  it("should handle server errors and return 500", async () => {
    (Item.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    await createItem(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Server error, could not create item",
    });
  });
});


describe("getItemsByPrice", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      query: {
        order: "asc",
      },
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve items ordered by price in ascending order", async () => {
    const mockItems = [
      { id: 1, price: 50 },
      { id: 2, price: 100 },
    ];

    (Item.findAll as jest.Mock).mockResolvedValue(mockItems);

    await getItemsByPrice(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Items retrieved successfully",
      data: mockItems,
    });
  });

  it("should handle server errors and return 500", async () => {
    (Item.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

    await getItemsByPrice(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Server error, could not retrieve items",
    });
  });
});

describe("getItemsByDuration", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      query: {
        order: "asc",
      },
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve items ordered by duration in ascending order", async () => {
    const mockItems = [
      { id: 1, duration: 10 },
      { id: 2, duration: 20 },
    ];

    (Item.findAll as jest.Mock).mockResolvedValue(mockItems);

    await getItemsByDuration(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Items retrieved successfully",
      data: mockItems,
    });
  });

  it("should handle server errors and return 500", async () => {
    (Item.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

    await getItemsByDuration(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Server error, could not retrieve items",
    });
  });
});
