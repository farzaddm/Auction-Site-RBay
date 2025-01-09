import { Request, Response } from "express";
import { createItem } from "../../controllers/itemController";
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
      data: mockItem,
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
