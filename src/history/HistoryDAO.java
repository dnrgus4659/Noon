package history;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;

import oracle.db.OracleConn;

public class HistoryDAO {
	OracleConn db = new OracleConn();
	public List<HistoryDTO> getHistory(String id){
		List<HistoryDTO> list = new Vector<HistoryDTO>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select * from history where toid = ? order by actionday desc";
		String con = "";
		conn = db.getConnection();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, id);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				HistoryDTO dto = new HistoryDTO();
				dto.setFormid(rs.getString("fromid"));
				dto.setAction(rs.getString("action"));
				dto.setActionday(rs.getTimestamp("actionday"));
				
				list.add(dto);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(rs, pstmt, conn);
		}
		
		return list;
	}
	
	public void insertHistory(String fromid, String toid, String action) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		if(action.equals("like")) {
			action = "좋아요를 눌렀습니다.";
		}
		
		String sql = "insert into history values(?,?,?,sysdate)";
		
		conn = db.getConnection();
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, fromid);
			pstmt.setString(2, toid);
			pstmt.setString(3, action);
			pstmt.execute();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(pstmt, conn);
		}
		
	}
	
	public int getHistoryCount(String id){
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "select count(*) from history where toid = ?";
		conn = db.getConnection();
		int cnt = 0;
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, id);
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				cnt = rs.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(rs, pstmt, conn);
		}
		
		return cnt;
	}
}