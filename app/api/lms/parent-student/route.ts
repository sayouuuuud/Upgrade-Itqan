/**
 * GET /api/lms/parent-student - Get family relationships
 * POST /api/lms/parent-student - Link parent to student
 * DELETE /api/lms/parent-student - Unlink parent from student
 */

import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import * as parentQueries from "@/lib/db-queries/parent"

export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Students can see their parents (or parents can see children)
    if (session.role === "student") {
      const parents = await parentQueries.getStudentParents(session.sub)
      return NextResponse.json({ success: true, data: parents })
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  } catch (error) {
    console.error("[API] Error fetching relationships:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admin can link students
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { studentId, parentId, relationship } = body

    if (!studentId || !parentId) {
      return NextResponse.json({ error: "Student ID and Parent ID required" }, { status: 400 })
    }

    const link = await parentQueries.linkParentToStudent(
      parentId,
      studentId,
      relationship || "parent"
    )

    return NextResponse.json({ success: true, data: link }, { status: 201 })
  } catch (error) {
    console.error("[API] Error linking parent-student:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { studentId, parentId } = body

    if (!studentId || !parentId) {
      return NextResponse.json({ error: "Student ID and Parent ID required" }, { status: 400 })
    }

    // Only admin can remove links
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const removed = await parentQueries.removeParentStudentLink(parentId, studentId)
    return NextResponse.json({ success: true, message: "Link removed" })
  } catch (error) {
    console.error("[API] Error removing relationship:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
