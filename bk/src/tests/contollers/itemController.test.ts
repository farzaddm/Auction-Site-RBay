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
        // create interfaces
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

    it("should create an item and return 201 status", async () => {
        (Item.create as jest.Mock).mockResolvedValue(req.body);

        await createItem(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith({
            message: "Item created successfully",
            data: req.body,
        });
    });

    it("should return 400 if required fields are missing", async () => {
        req.body = { name: "", description: "", duration: null };

        await createItem(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({
            message: "Name, description, and duration are required",
        });
    });

    it("should return 500 if there is a server error", async () => {
        (Item.create as jest.Mock).mockRejectedValue(new Error("Server error"));

        await createItem(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({
            message: "Server error, could not create item",
        });
    });
});

// We recommend installing an extension to run jest tests.