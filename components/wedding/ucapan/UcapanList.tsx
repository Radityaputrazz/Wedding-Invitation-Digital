import { useRef } from "react";
import { Ucapan } from "./types";
import { styles } from "./styles";
import { getInitial } from "./utils";

interface UcapanListProps {
  ucapanList: Ucapan[];
  fetching: boolean;
}

export default function UcapanList({ ucapanList, fetching }: UcapanListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div style={styles.listHeader}>
        <h3 style={styles.subTitle}>Daftar Ucapan</h3>
        <span style={styles.countBadge}>{ucapanList.length} Pesan</span>
      </div>

      <div ref={listRef} style={styles.listContainer} className="custom-scroll">
        {fetching ? (
          <div style={styles.statusContainer}>
            <div className="spinner" />
            <p style={styles.statusText}>Memuat pesan...</p>
          </div>
        ) : ucapanList.length === 0 ? (
          <p style={styles.statusText}>Belum ada ucapan. Jadilah yang pertama!</p>
        ) : (
          ucapanList.map((item, i) => (
            <UcapanCard key={i} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

function UcapanCard({ item }: { item: Ucapan }) {
  return (
    <div style={styles.ucapanCard} className="card-hover">
      <div style={styles.cardLayout}>
        <div style={styles.avatar}>{getInitial(item.nama)}</div>
        <div style={{ flex: 1 }}>
          <div style={styles.cardHeader}>
            <p style={styles.cardName}>{item.nama}</p>
            <span style={styles.cardWaktu}>{item.waktu}</span>
          </div>
          <p style={styles.cardPesan}>"{item.pesan}"</p>
        </div>
      </div>
    </div>
  );
}