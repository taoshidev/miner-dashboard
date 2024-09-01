export interface Source {
  close: number;
  high: number;
  lag_ms: number;
  low: number;
  open: number;
  source: string;
  start_ms: number;
  timespan_ms: number;
  volume: number;
}

export interface Order {
  leverage: number;
  order_type: string;
  order_uuid: string;
  price: number;
  price_sources: Source[];
  processed_ms: number;
  trade_pair: TradePair;
}

export type TradePair = [string, string, number, number, number, string];

export interface Position {
  average_entry_price: number;
  close_ms: number;
  current_return: number;
  is_closed_position: boolean;
  miner_hotkey: string;
  net_leverage: number;
  open_ms: number;
  orders: Order[];
  position_type: string;
  position_uuid: string;
  return_at_close: number;
  trade_pair: TradePair[];
}

export interface Scores {
  value: number;
  rank: number;
  percentile: number;
}

export interface Penalties {
  biweekly: number;
  daily: number;
  drawdown: number;
  returns_ratio: number;
  time_consistency: number;
  total: number;
}

export interface PenalizedScores {
  omega: Scores;
  sharpe: Scores;
  risk_adjusted_return: Scores;
  short_risk_adjusted_return: Scores;
}

export interface StatisticsData {
  penalties: Penalties;
  scores: Scores;
  penalized_scores: PenalizedScores;
}

export interface Statistics {
  data: StatisticsData[];
}

export interface MinerData {
  statistics: Statistics;
  positions: Position[];
}