'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { Star, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react'
import { Progress } from "../../../components/ui/progress"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  date: string
  content: string
  rating: number
  likes: number
  dislikes: number
}

const comments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Gabriel',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'G'
    },
    date: 'July 28, 2023',
    content: 'I needed a fast, efficient laptop for on the go use. battery life is amazing. Build quality is fantastic. Perfect fit for my needs.',
    rating: 4.8,
    likes: 15,
    dislikes: 2
  },
  {
    id: '2',
    user: {
      name: 'Jimmy Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'JS'
    },
    date: 'May 15, 2023',
    content: 'This macbook air at first feels just so big to me using it for school, and after a while, it felt as a perfect size. I look at it sometimes and realize how portable and small it is, but IT FEELS AS BIG AS LIKE A TV SCREEN. It\'s not a huge computer, but when your doing work and typing or whatever watching youtube it feels like a movie screen, beautiful. I never had such a good computer that just feels like a breath of fresh air. If you are contemplating on buying one, I would get 512 GB of storage and 16 ram. You will not be disappointed if you buy this no matter what, I strongly recommend it.',
    rating: 5.0,
    likes: 8,
    dislikes: 0
  },
  {
    id: '3',
    user: {
      name: 'Sarah Anderson',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'SA'
    },
    date: 'April 12, 2023',
    content: 'This was my first personal Mac purchase. We are using a combination of Mac & PC at work and while my PC skills are good the Mac side needs work.\n\nSo far I like the experience, although not all my apps will run on the Mac, I am finding workarounds.\nOne person found this helpful',
    rating: 4.2,
    likes: 34,
    dislikes: 5
  }
]

const features = [
  { name: 'Battery charge', rating: 4.8 },
  { name: 'Monitor', rating: 4.9 },
  { name: 'Lightness', rating: 4.3 }
]

export function Comments() {
  const [commentText, setCommentText] = useState('')

  return (
    <div className="space-y-8">
      {/* Add Comment Section */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          leave your comments here for other customers
        </p>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your thoughts about this product here"
          className="min-h-[100px]"
        />
        <Button>Comment</Button>
      </div>

      {/* Features Rating Section */}
      <div className="space-y-4">
        <h3 className="font-medium">By feature</h3>
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.name} className="grid grid-cols-[100px_1fr_50px] gap-4 items-center">
              <div className="text-sm">{feature.name}</div>
              <Progress value={feature.rating * 20} className="h-2" />
              <div className="text-sm text-right">{feature.rating}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-sm text-muted-foreground">{comment.date}</span>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(comment.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{comment.rating}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{comment.dislikes}</span>
                  </Button>
                  <Button variant="link" size="sm" className="flex items-center gap-1">
                    Show More
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

