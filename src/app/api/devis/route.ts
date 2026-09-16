import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Fallback in-memory store for quotes if database connection is in local development setup
let memoryQuotes: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      projectType,
      deadline,
      notes,
      items,
    } = body;

    if (!companyName || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires (Société, Contact, Email, Téléphone)." },
        { status: 400 }
      );
    }

    const referenceNumber = `TF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let savedQuote;

    try {
      // Attempt to save to PostgreSQL via Prisma
      savedQuote = await prisma.quoteRequest.create({
        data: {
          referenceNumber,
          companyName,
          contactName,
          email,
          phone,
          projectType,
          deadline,
          notes,
          status: "PENDING",
        },
      });
    } catch (dbError) {
      console.warn("PostgreSQL not reached, saving to internal memory store:", dbError);
      savedQuote = {
        id: `quote-${Date.now()}`,
        referenceNumber,
        companyName,
        contactName,
        email,
        phone,
        projectType,
        deadline,
        notes,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };
      memoryQuotes.push({ ...savedQuote, items });
    }

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        quote: savedQuote,
        message: "Votre demande de devis a été enregistrée avec succès. Notre équipe vous répondra sous 24h.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du devis:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors du traitement du devis." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let quotes: any[] = [];
    try {
      quotes = await prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (dbError) {
      console.warn("PostgreSQL fallback for GET /api/devis");
      quotes = memoryQuotes;
    }

    return NextResponse.json({ quotes });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
