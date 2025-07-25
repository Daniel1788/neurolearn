"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Map, Plus, Trash2, CheckCircle, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface MindMappingProps {
  onComplete: () => void
}

interface Node {
  id: string
  text: string
  x: number
  y: number
  color: string
  parentId: string | null
  children: string[]
}

const colors = [
  "bg-red-200 dark:bg-red-800",
  "bg-blue-200 dark:bg-blue-800",
  "bg-green-200 dark:bg-green-800",
  "bg-yellow-200 dark:bg-yellow-800",
  "bg-purple-200 dark:bg-purple-800",
  "bg-pink-200 dark:bg-pink-800",
  "bg-indigo-200 dark:bg-indigo-800",
  "bg-orange-200 dark:bg-orange-800",
]

export function MindMapping({ onComplete }: MindMappingProps) {
  const [nodes, setNodes] = useState<Record<string, Node>>({})
  const [mainTopic, setMainTopic] = useState("")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [newNodeText, setNewNodeText] = useState("")
  const [saved, setSaved] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (mainTopic && Object.keys(nodes).length === 0) {
      // Create the root node
      const rootId = "root"
      setNodes({
        [rootId]: {
          id: rootId,
          text: mainTopic,
          x: 400,
          y: 200,
          color: "bg-primary/20",
          parentId: null,
          children: [],
        },
      })
      setSelectedNode(rootId)
    }
  }, [mainTopic, nodes])

  const handleAddNode = () => {
    if (!selectedNode || !newNodeText.trim()) {
      toast({
        title: "Eroare",
        description: "Selectează un nod și introdu textul pentru noul nod.",
        variant: "destructive",
      })
      return
    }

    const parentNode = nodes[selectedNode]
    const newNodeId = Date.now().toString()
    const angle = (parentNode.children.length * 45) % 360
    const distance = 150
    const x = parentNode.x + Math.cos((angle * Math.PI) / 180) * distance
    const y = parentNode.y + Math.sin((angle * Math.PI) / 180) * distance

    const newNode: Node = {
      id: newNodeId,
      text: newNodeText,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      parentId: selectedNode,
      children: [],
    }

    setNodes({
      ...nodes,
      [newNodeId]: newNode,
      [selectedNode]: {
        ...parentNode,
        children: [...parentNode.children, newNodeId],
      },
    })

    setNewNodeText("")
    setSelectedNode(newNodeId)
  }

  const handleDeleteNode = (nodeId: string) => {
    if (nodeId === "root") {
      toast({
        title: "Eroare",
        description: "Nu poți șterge nodul principal.",
        variant: "destructive",
      })
      return
    }

    const node = nodes[nodeId]
    const parentNode = node.parentId ? nodes[node.parentId] : null

    // Create a new nodes object without the deleted node
    const { [nodeId]: deletedNode, ...restNodes } = nodes

    // Remove the node from its parent's children
    if (parentNode) {
      restNodes[parentNode.id] = {
        ...parentNode,
        children: parentNode.children.filter((id) => id !== nodeId),
      }
    }

    // Recursively delete all children
    const deleteChildren = (childrenIds: string[]) => {
      childrenIds.forEach((childId) => {
        const child = nodes[childId]
        if (child) {
          deleteChildren(child.children)
          delete restNodes[childId]
        }
      })
    }

    deleteChildren(node.children)

    setNodes(restNodes)
    setSelectedNode(node.parentId)
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId)
  }

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    const node = nodes[nodeId]
    setIsDragging(true)
    setDraggedNode(nodeId)
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && draggedNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - dragOffset.x
      const y = e.clientY - rect.top - dragOffset.y

      setNodes({
        ...nodes,
        [draggedNode]: {
          ...nodes[draggedNode],
          x,
          y,
        },
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedNode(null)
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: "Hartă mentală salvată",
      description: "Harta ta mentală a fost salvată cu succes.",
    })
    setSaved(true)
  }

  const handleComplete = () => {
    onComplete()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
              <Map className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle>Hărți Mentale</CardTitle>
              <CardDescription>Organizează vizual informațiile și conexiunile dintre concepte</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!mainTopic ? (
            <div className="space-y-4">
              <Label htmlFor="mainTopic">Subiectul principal</Label>
              <Input
                id="mainTopic"
                placeholder="Ex: Sistemul Solar, Revoluția Industrială, etc."
                value={mainTopic}
                onChange={(e) => setMainTopic(e.target.value)}
              />
              <Button
                onClick={() => setMainTopic(mainTopic.trim())}
                disabled={!mainTopic.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Creează harta mentală
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="newNode">Adaugă un nod nou</Label>
                  <Input
                    id="newNode"
                    placeholder="Introdu textul pentru noul nod..."
                    value={newNodeText}
                    onChange={(e) => setNewNodeText(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddNode} disabled={!selectedNode || !newNodeText.trim()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adaugă
                </Button>
              </div>

              <div
                ref={canvasRef}
                className="relative w-full h-[400px] border rounded-md overflow-hidden bg-muted/20"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Draw lines between nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {Object.values(nodes).map((node) => {
                    if (node.parentId) {
                      const parent = nodes[node.parentId]
                      return (
                        <line
                          key={`${parent.id}-${node.id}`}
                          x1={parent.x}
                          y1={parent.y}
                          x2={node.x}
                          y2={node.y}
                          stroke="currentColor"
                          strokeOpacity={0.3}
                          strokeWidth={2}
                        />
                      )
                    }
                    return null
                  })}
                </svg>

                {/* Render nodes */}
                {Object.values(nodes).map((node) => (
                  <motion.div
                    key={node.id}
                    className={`absolute px-3 py-2 rounded-md ${node.color} ${
                      selectedNode === node.id ? "ring-2 ring-primary" : ""
                    } cursor-move`}
                    style={{
                      left: node.x,
                      top: node.y,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNodeClick(node.id)
                    }}
                    onMouseDown={(e) => handleMouseDown(e, node.id)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{node.text}</span>
                      {node.id !== "root" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNode(node.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Instrucțiuni:</strong> Selectează un nod pentru a adăuga noduri copil. Trage nodurile pentru a
                  le rearanja.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        {mainTopic && (
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleSave} disabled={saved || Object.keys(nodes).length <= 1}>
              <Save className="mr-2 h-4 w-4" />
              Salvează
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!saved}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Finalizează
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
