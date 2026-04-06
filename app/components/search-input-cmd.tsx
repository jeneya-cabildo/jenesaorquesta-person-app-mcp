'use client'

import * as React from "react"
import { SearchCommand } from "@/components/search-command"
import { searchUsers } from '@/app/actions/actions'
import { User } from "../actions/schemas"
import {
  Server,
  StdioServerTransport,
} from "@modelcontextprotocol/sdk/server/stdio";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const server = new Server(
  {
    name: "person-app",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "createPerson",
        description: "Create a new person record in the database",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Full name" },
            email: { type: "string", description: "Email address" },
            phone: { type: "string", description: "Phone number (optional)" },
            address: { type: "string", description: "Address (optional)" },
            bio: { type: "string", description: "Biography (optional)" },
          },
          required: ["name", "email"],
        },
      },
      {
        name: "readPerson",
        description: "Read person by ID or list all persons",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Person ID (omit to get all)",
            },
          },
        },
      },
      {
        name: "updatePerson",
        description: "Update an existing person record",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number", description: "Person ID" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
            bio: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "deletePerson",
        description: "Delete a person record by ID",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number", description: "Person ID" },
          },
          required: ["id"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "createPerson") {
      const person = await prisma.person.create({
        data: {
          name: args.name,
          email: args.email,
          phone: args.phone || undefined,
          address: args.address || undefined,
          bio: args.bio || undefined,
        },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
      };
    }

    if (name === "readPerson") {
      if (args.id) {
        const person = await prisma.person.findUnique({
          where: { id: args.id },
        });
        return {
          content: [
            {
              type: "text",
              text: person
                ? JSON.stringify(person, null, 2)
                : "Person not found",
            },
          ],
        };
      }
      const persons = await prisma.person.findMany();
      return {
        content: [{ type: "text", text: JSON.stringify(persons, null, 2) }],
      };
    }

    if (name === "updatePerson") {
      const person = await prisma.person.update({
        where: { id: args.id },
        data: {
          name: args.name || undefined,
          email: args.email || undefined,
          phone: args.phone || undefined,
          address: args.address || undefined,
          bio: args.bio || undefined,
        },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
      };
    }

    if (name === "deletePerson") {
      const person = await prisma.person.delete({
        where: { id: args.id },
      });
      return {
        content: [
          {
            type: "text",
            text: `Successfully deleted: ${person.name}`,
          },
        ],
      };
    }

    return {
      content: [{ type: "text", text: "Tool not found" }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Person App MCP Server started");
}

main().catch(console.error);

