import { Star, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import MotionDiv from "@/components/common/MotionDiv"
import { getMyReviews } from "../_actions/reviews"

export default async function TenantReviews() {
  const { data: myReviews } = await getMyReviews()

  return (
    <div className="space-y-6 p-6">
      <MotionDiv className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Reviews
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your reviews of properties and landlords.
          </p>
        </div>
      </MotionDiv>

      <div className="grid gap-6">
        {myReviews?.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {review.property.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Landlord: {review.tenant.name}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(review.createdAt).toDateString()}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>

            <p className="mt-2 text-foreground/90">{review.comment}</p>

            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

        {myReviews?.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            <Star className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p>You haven't written any reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
