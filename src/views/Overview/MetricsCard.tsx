import { Box, Stack, Typography } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

export function MetricsCard({
  title,
  thisWeek,
  lastWeek,
}: {
  title: string
  thisWeek: number
  lastWeek: number
}) {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="h4" component="div">
          {thisWeek}
        </Typography>

        {lastWeek > 0 && thisWeek !== lastWeek && (
          <>
            {thisWeek > lastWeek ? (
              <ArrowUpwardIcon color="success" />
            ) : (
              <ArrowDownwardIcon color="error" />
            )}

            <Typography variant="body2" component="div">
              {Math.abs(((thisWeek - lastWeek) / lastWeek) * 100).toFixed(0)}%
            </Typography>
          </>
        )}
      </Stack>

      <Typography variant="body2" component="div">
        {lastWeek} last week
      </Typography>
    </Box>
  )
}
